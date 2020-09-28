import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { EditorService } from './editor.service';

@Component({
	selector: 'app-editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class EditorComponent implements OnInit {
	selected = 0;

	constructor(private editorService: EditorService) {}

	ngOnInit(): void {
		this.editorService.selected.subscribe((e) => {
			this.selected = e;
		});
	}

	clickPreview(): void {
		this.editorService.selected.next(1);
	}

	clickAdd(): void {
		this.editorService.selected.next(2);
	}

	clickMusic(): void {
		this.editorService.selected.next(3);
	}

	clickRestore(): void {
		this.editorService.selected.next(4);
	}
}
