import { tap } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';

import { EditorService } from '../../core/editor.service';

@Component({
	selector: 'app-canvas',
	templateUrl: './canvas.component.html',
	styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit {
	vids: string[];

	video: HTMLVideoElement;
	cTmp: HTMLCanvasElement;
	ctxTmp: CanvasRenderingContext2D;
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;

	constructor(private service: EditorService) {}

	ngOnInit(): void {
		this.service.vidUrl.pipe(tap((e) => (this.vids = e))).subscribe();
	}

	init(url: string): void {
		console.log('init!');
		console.log(this.vids);
		this.canvas = document.querySelector('canvas');

		this.ctx = this.canvas.getContext('2d');

		this.cTmp = document.createElement('canvas');
		this.cTmp.setAttribute('width', '200');
		this.cTmp.setAttribute('height', '200');

		this.ctxTmp = this.cTmp.getContext('2d');

		this.video = document.querySelector('video');

		this.computeFrame();
	}

	computeFrame(): void {
		this.ctxTmp.drawImage(
			this.video,
			0,
			0,
			this.video.videoWidth,
			this.video.videoHeight
		);
		console.log({ videoHeight: this.video.videoHeight });
		const frame = this.ctxTmp.getImageData(
			0,
			0,
			this.video.videoWidth,
			this.video.videoHeight
		);
		this.ctx.putImageData(frame, 0, 0);
		setTimeout(this.computeFrame, 250);
	}
}
