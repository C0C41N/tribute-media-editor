import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { EditorService } from '../core/editor.service';

@Component({
	selector: 'app-editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class EditorComponent implements OnInit {
	selected = 0;

	constructor(private service: EditorService, private router: Router) {}

	ngOnInit(): void {
		this.service.selected.subscribe((e) => {
			this.selected = e;
		});
	}

	clickPreview(): void {
		this.service.setSelected(1);
		this.router.navigate(['preview']);
	}

	clickAdd(): void {
		this.service.setSelected(2);
		this.router.navigate(['add-clip']);
	}

	clickMusic(): void {
		this.service.setSelected(3);
		this.router.navigate(['music']);
	}

	clickRestore(): void {
		this.service.setSelected(4);
		this.router.navigate(['restore']);
	}
}
