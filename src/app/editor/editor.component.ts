import { BehaviorSubject } from 'rxjs';

import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'app-editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class EditorComponent implements OnInit {
	private selectedSource = new BehaviorSubject<number>(0);
	selected = 0;

	constructor() {}

	ngOnInit(): void {
		this.selectedSource.subscribe((e) => {
			this.selected = e;
		});
	}

	clickPreview(): void {
		this.selectedSource.next(1);
	}

	clickAdd(): void {
		this.selectedSource.next(2);
	}

	clickMusic(): void {
		this.selectedSource.next(3);
	}

	clickRestore(): void {
		this.selectedSource.next(4);
	}
}
