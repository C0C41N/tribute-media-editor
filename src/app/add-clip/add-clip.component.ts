import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EditorService } from '../core/editor.service';

@Component({
	selector: 'app-add-clip',
	templateUrl: './add-clip.component.html',
	styleUrls: ['./add-clip.component.scss'],
})
export class AddClipComponent implements OnInit {
	constructor(private router: Router, private editorService: EditorService) {}

	ngOnInit(): void {}

	clickClose(): void {
		this.editorService.setSelected(0);
		this.router.navigate(['edit']);
	}

	clickVideo(): void {
		this.router.navigate(['video']);
	}
}
