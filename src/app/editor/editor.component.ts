import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { EditorService } from '../shared/editor.service';

@Component({
	selector: 'app-editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class EditorComponent implements OnInit {
	selected = 0;

	constructor(private editorService: EditorService, private router: Router) {}

	ngOnInit(): void {
		this.editorService.selected.subscribe((e) => {
			this.selected = e;
		});
	}

	clickPreview(): void {
		this.editorService.setSelected(1);
		this.router.navigate(['preview']);
	}

	clickAdd(): void {
		this.editorService.setSelected(2);
		this.router.navigate(['add-clip']);
	}

	clickMusic(): void {
		this.editorService.setSelected(3);
		this.router.navigate(['music']);
	}

	clickRestore(): void {
		this.editorService.setSelected(4);
		this.router.navigate(['restore']);
	}
}
