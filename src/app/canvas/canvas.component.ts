import { animationFrameScheduler, fromEvent, interval, partition, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { EditorService } from 'src/app/core/editor.service';

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
		this.videoRef.changes.pipe(take(1)).subscribe(this.beforePlay);

		const clicks$ = this.canvasControl.asObservable();
		const [play$, pause$] = partition(clicks$, (e, i) => i % 2 === 0);

		play$.subscribe(this.play);
		pause$.subscribe(this.pause);
	}

	play = (): void => {
		this.beforePlay();
		this.video.play();

		const pause$ = fromEvent(this.video, 'pause').pipe(take(1));
		const ended$ = fromEvent(this.video, 'ended').pipe(
			takeUntil(this.canvasControl)
		);

		ended$.subscribe(this.ended);

		const frame$ = interval(0, animationFrameScheduler).pipe(takeUntil(pause$));

		const { width, height } = this.canvas;

		frame$.subscribe(() => {
			this.ctx.drawImage(this.video, 0, 0, width, height);
		});
	};

	beforePlay = (x = false) => {
		this.video = this.videoRef.toArray()[this.currentVid].nativeElement;

		const setSize = () => {
			const { width } = this.canvas;
			const { videoHeight, videoWidth } = this.video;

			const hRatio = (width / videoWidth) * videoHeight;

			this.canvas.height = hRatio;
			this.canvas.style.height = `${hRatio}px`;
		};

		const asyncReady = fromEvent(this.video, 'canplay').pipe(take(1));

		x ? asyncReady.subscribe(setSize) : setSize();
	};

	pause = (): void => {
		this.video.pause();
	};

	ended = (): void => {
		// pause
		this.canvasControl.next();
		// check
		this.currentVid++;
		const wasLastVid = this.currentVid === this.videos.length;
		// play
		if (!wasLastVid) this.canvasControl.next();
		if (wasLastVid) this.currentVid = 0;
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
