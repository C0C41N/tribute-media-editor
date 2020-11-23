import { animationFrameScheduler, fromEvent, interval, merge, partition, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { EditorService } from 'src/app/core/editor.service';
import { $log } from 'src/app/core/misc';

import {
	AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren
} from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Component({
	selector: 'app-canvas',
	templateUrl: './canvas.component.html',
	styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements AfterViewInit, OnInit {
	currentVid: number = 0;

	thumbnails: SafeUrl[];
	videos: SafeUrl[];

	canvas: HTMLCanvasElement;
	video: HTMLVideoElement;

	ctx: CanvasRenderingContext2D;

	canvasControl = new Subject<void>();

	@ViewChild('canvas') canvasRef: ElementRef<HTMLCanvasElement>;
	@ViewChildren('video') videoRef: QueryList<ElementRef<HTMLVideoElement>>;

	constructor(private svc: EditorService) {}

	ngAfterViewInit(): void {
		this.canvas = this.canvasRef.nativeElement;
		this.ctx = this.canvas.getContext('2d');

		// disable context menu
		fromEvent(this.canvas, 'contextmenu').subscribe((e) => e.preventDefault());
		// canvas play/pause on click
		fromEvent(this.canvas, 'click').subscribe(() => this.canvasControl.next());
		// resize canvas on first upload
		this.videoRef.changes.pipe(first()).subscribe(this.beforePlay);

		const clicks$ = this.canvasControl.asObservable();
		const [play$, pause$] = partition(clicks$, (e, i) => i % 2 === 0);

		play$.subscribe(this.play);
		pause$.subscribe(this.pause);
	}

	play = (): void => {
		$log('play');
		this.beforePlay();
		this.video.play();

		const ended$ = fromEvent(this.video, 'ended');
		const pause$ = fromEvent(this.video, 'pause');
		const stop$ = merge(ended$, pause$);

		ended$.pipe(first()).subscribe(() => this.canvasControl.next());

		const frame$ = interval(0, animationFrameScheduler).pipe(takeUntil(stop$));

		frame$.subscribe(() => {
			this.ctx.drawImage(this.video, 0, 0);
		});
	};

	pause = (): void => {
		$log('pause');
		this.video.pause();
	};

	beforePlay = (x = false): void => {
		this.video = this.videoRef.toArray()[this.currentVid].nativeElement;

		const setSize = (): void => {
			const { videoWidth, videoHeight } = this.video;

			this.canvas.width = videoWidth;
			this.canvas.height = videoHeight;
			this.canvas.style.width = `${videoWidth}px`;
			this.canvas.style.height = `${videoHeight}px`;
		};

		x ? fromEvent(this.video, 'canplay').subscribe(setSize) : setSize();
	};

	ngOnInit(): void {
		this.svc.thumbUrl.subscribe((e) => {
			this.thumbnails = e;
		});

		this.svc.vidUrl.subscribe((e) => {
			this.videos = e;
		});
	}
}
