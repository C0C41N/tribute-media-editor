import { fromEvent, partition } from 'rxjs';
import { distinctUntilKeyChanged } from 'rxjs/operators';
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

	@ViewChild('canvas') canvasRef: ElementRef<HTMLCanvasElement>;
	@ViewChildren('video') videoRef: QueryList<HTMLVideoElement>;

	constructor(private svc: EditorService) {}

	ngAfterViewInit(): void {
		this.canvas = this.canvasRef.nativeElement;

		this.videoRef.changes
			.pipe(distinctUntilKeyChanged('length'))
			.subscribe((e) => $log(e.length));

		const clicks$ = fromEvent(this.canvas, 'click');
		const [play$, pause$] = partition(clicks$, (e, i) => i % 2 === 0);

		play$.subscribe();
		pause$.subscribe();

		this.svc.vidUrl
			.pipe(
				filter((e) => e.length > 0),
				first(),
				map((e) => e[0])
			)
			.subscribe((e) => {
				this.video.hidden = true;
				this.video.src = this.sanitizer.sanitize(4, e);
			});
		fromEvent(this.video, 'canplay').subscribe(() => {
			this.video.play();
			const height = this.video.videoHeight;
			const width = this.video.videoWidth;
			this.canvas.width = width;
			this.canvas.height = height;
			this.canvas.style.width = `${width}px`;
			this.canvas.style.height = `${height}px`;
			const step = (): void => {
				this.ctx.drawImage(this.videoRef.nativeElement, 0, 0);
				requestAnimationFrame(step);
			};
			requestAnimationFrame(step);
		});
	}

	play(): void {
		this.video = this.videoRef.toArray()[this.currentVid];
		this.ctx = this.canvas.getContext('2d');
	}

	ngOnInit(): void {
		this.svc.thumbUrl.subscribe((e) => {
			this.thumbnails = e;
		});

		this.svc.vidUrl.subscribe((e) => {
			this.videos = e;
		});
	}
}
