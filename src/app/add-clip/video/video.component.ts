import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-video',
	templateUrl: './video.component.html',
	styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
	progress: string;

	constructor() {}

	ngOnInit(): void {}

	InputChange(files: FileList): void {
		console.log(files.item(0));
	}

	UploadClick(): void {
		document.getElementById('InputVideo').click();
	}
}
