import { ffmpeg } from 'ffmpeg.js';
import { combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EditorService } from 'src/app/core/editor.service';

import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
	selector: 'app-canvas',
	templateUrl: './canvas.component.html',
	styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit, AfterViewInit {
	vids: string[];

	@ViewChildren('video')
	video: QueryList<HTMLVideoElement>;

	@ViewChildren('canvas')
	canvas: QueryList<HTMLCanvasElement>;

	constructor(private service: EditorService) {}

	ngOnInit(): void {
		this.service.vidUrl
			.pipe(
				tap((e) => {
					this.vids = e;
					if (e[0]) {
						console.log('beforeFetch');
						fetch(e[0]).then((res) => {
							console.log('fetch', e[0]);
							res.arrayBuffer().then((b) => console.log('bin', b));
						});
					}
				})
			)
			.subscribe();
	}

	ngAfterViewInit(): void {
		const vidAdded = combineLatest([this.video.changes, this.canvas.changes]);

		vidAdded.subscribe((e) => {
			const l = e.map((i: QueryList<any>) => i.toArray()[0].nativeElement);
			const v: HTMLVideoElement = l[0];
			const canvas: HTMLCanvasElement = l[1];

			const context = canvas.getContext('2d');

			v.addEventListener(
				'play',
				() => {
					console.log('ok.');
					const cw = v.videoWidth;
					const ch = v.videoHeight;
					canvas.width = cw / v.clientWidth;
					canvas.height = ch / v.clientHeight;
					const vRatio = (200 / v.videoHeight) * v.videoWidth;
					const hRatio = (200 / v.videoWidth) * v.videoHeight;
					setInterval(this.draw, 1000 / 30, v, context, vRatio, hRatio);
				},
				false
			);
		});
	}

	draw(
		v: HTMLVideoElement,
		context: CanvasRenderingContext2D,
		cw: number,
		ch: number
	): void {
		if (v.paused || v.ended) {
			return;
		}
		context.drawImage(v, 0, 0, cw, ch);
	}
}
