import { EditorService } from 'src/app/core/editor.service';

import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Component({
	selector: 'app-canvas',
	templateUrl: './canvas.component.html',
	styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements AfterViewInit, OnInit {
	thumbnails: SafeUrl[];

	@ViewChildren('img')
	video: QueryList<HTMLImageElement>;

	constructor(private svc: EditorService) {}

	ngAfterViewInit(): void {}

	ngOnInit(): void {
		this.svc.thumbUrl.subscribe((e) => {
			this.thumbnails = e;
		});
	}
}
