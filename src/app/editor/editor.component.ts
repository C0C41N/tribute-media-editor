import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'app-editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class EditorComponent implements OnInit {
	constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
		iconRegistry.addSvgIcon(
			'play',
			sanitizer.bypassSecurityTrustResourceUrl('assets/icons/play-circle.svg')
		);
	}

	ngOnInit(): void {}
}
