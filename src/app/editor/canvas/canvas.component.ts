import { Component, OnInit } from '@angular/core';

import { EditorService } from '../../core/editor.service';

@Component({
	selector: 'app-canvas',
	templateUrl: './canvas.component.html',
	styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit {
	vids: string[];

	constructor(private service: EditorService) {}

	ngOnInit(): void {
		this.service.vidUrl.subscribe((e) => (this.vids = e));
	}
}
