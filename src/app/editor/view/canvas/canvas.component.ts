import { combineLatest } from 'rxjs';
import { EditorService } from 'src/app/core/editor.service';

import { AfterViewInit, Component, QueryList, ViewChildren } from '@angular/core';

@Component({
	selector: 'app-canvas',
	templateUrl: './canvas.component.html',
	styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements AfterViewInit {
	thumbnails: string[];

	@ViewChildren('img')
	video: QueryList<HTMLImageElement>;

	constructor(private svc: EditorService) {}

	ngAfterViewInit(): void {}
}
