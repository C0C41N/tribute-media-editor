import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { EditorService } from 'src/app/core/editor.service';
import { UploadService } from 'src/app/core/upload.service';

import { HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-video',
	templateUrl: './video.component.html',
	styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
	progress: Observable<string>;
	downloadUrl: string;

	@ViewChild('inputVideo')
	inputVideo: ElementRef<HTMLInputElement>;

	constructor(
		private service: EditorService,
		private router: Router,
		private uploadSvc: UploadService
	) {}

	ngOnInit(): void {}

	clickUpload(): void {
		this.inputVideo.nativeElement.click();
	}

	InputChange(files: FileList): void {
		this.uploadSvc.upload(files.item(0)).subscribe((e) => {
			if (e.type === HttpEventType.Response) {
				console.log('done\n' + JSON.stringify(e, null, '\t'));
				this.router.navigate(['add-clip']);
			}
			if (e.type === HttpEventType.UploadProgress) {
				const percent = Math.round((100 * e.loaded) / e.total);
				console.log(`Progress: ${percent}%`);
			}
		});
	}
}
