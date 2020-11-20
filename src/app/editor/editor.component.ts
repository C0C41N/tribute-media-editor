import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { EditorService } from '../core/editor.service';
import { FFmpegService } from '../core/ffmpeg.service';

@Component({
	selector: 'app-editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class EditorComponent implements OnInit {
	loaded = false;
	selected = 0;

	constructor(
		private service: EditorService,
		private router: Router,
		private ffmpegSvc: FFmpegService
	) {}

	ngOnInit(): void {
		this.ffmpegSvc.loaded.subscribe((e) => {
			this.loaded = true;
		});

		this.service.selected.subscribe((e) => {
			this.selected = e;
		});
	}

	clickPreview(): void {
		this.service.setSelected(1);
		this.router.navigate(['preview']);
	}

	clickMusic(): void {
		this.service.setSelected(3);
		this.router.navigate(['music']);
	}

	clickRestore(): void {
		this.service.setSelected(4);
		this.router.navigate(['restore']);
	}

	clickAdd(): void {
		this.service.clickAdd();
	}
}
