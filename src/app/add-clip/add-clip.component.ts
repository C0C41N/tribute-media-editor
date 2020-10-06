import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EditorService } from '../core/editor.service';

@Component({
	selector: 'app-add-clip',
	templateUrl: './add-clip.component.html',
	styleUrls: ['./add-clip.component.scss'],
})
export class AddClipComponent implements OnInit {
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private editorService: EditorService
	) {}

	ngOnInit(): void {}

	clickClose(): void {
		this.editorService.setSelected(0);
		this.router.navigate(['edit']);
	}

	clickVideo(): void {
		this.router.navigate(['video'], { relativeTo: this.route });
	}

	clickText(): void {
		this.router.navigate(['text'], { relativeTo: this.route });
	}

	clickImage(): void {
		this.router.navigate(['image'], { relativeTo: this.route });
	}

	clickTransition(): void {
		this.router.navigate(['transition'], { relativeTo: this.route });
	}
}
