import { combineLatest } from 'rxjs';
import { EditorService } from 'src/app/core/editor.service';

import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
	selector: 'app-canvas',
	templateUrl: './canvas.component.html',
	styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit, AfterViewInit {
	thumbnails: string[];

	@ViewChildren('video')
	video: QueryList<HTMLVideoElement>;

	@ViewChildren('canvas')
	canvas: QueryList<HTMLCanvasElement>;

	constructor(private svc: EditorService) {}

	ngOnInit(): void {}

	ngAfterViewInit(): void {}
}
