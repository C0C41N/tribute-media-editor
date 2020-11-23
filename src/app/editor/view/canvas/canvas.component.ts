import { fromEvent, Observable } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { EditorService } from 'src/app/core/editor.service';

import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
	selector: 'app-canvas',
	templateUrl: './canvas.component.html',
	styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements AfterViewInit, OnInit {
	thumbnails: SafeUrl[];
	videos: SafeUrl[];
	canvas: HTMLCanvasElement;
	video: HTMLVideoElement;
	ctx: CanvasRenderingContext2D;

	@ViewChild('canvas') canvasRef: ElementRef<HTMLCanvasElement>;
	@ViewChild('video') videoRef: ElementRef<HTMLVideoElement>;

	constructor(private svc: EditorService, private sanitizer: DomSanitizer) {}

	ngAfterViewInit(): void {
		this.canvas = this.canvasRef.nativeElement;
		this.video = this.videoRef.nativeElement;
		this.ctx = this.canvas.getContext('2d');

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

	ngOnInit(): void {
		this.svc.thumbUrl.subscribe((e) => {
			this.thumbnails = e;
		});

		this.svc.vidUrl.subscribe((e) => {
			this.videos = e;
		});
	}
}
