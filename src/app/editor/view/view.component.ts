import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EditorService } from '../../core/editor.service';

@Component({
	selector: 'app-view',
	templateUrl: './view.component.html',
	styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
	constructor(private service: EditorService, private router: Router) {}

	ngOnInit(): void {}

	clickAdd(): void {
		this.service.clickAdd();
	}
}
