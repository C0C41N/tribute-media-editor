import { Component, OnInit } from '@angular/core';

import { FFmpegService } from './core/ffmpeg.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	constructor(private ffmpeg: FFmpegService) {}

	ngOnInit() {
		this.ffmpeg.load();
	}
}
