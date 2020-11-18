import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EditorService } from 'src/app/core/editor.service';
import { UploadService } from 'src/app/core/upload.service';

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
		private svc: EditorService,
		private router: Router,
		private uploadSvc: UploadService
	) {}

	ngOnInit(): void {}

	clickUpload(): void {
		this.inputVideo.nativeElement.click();
	}

	InputChange(files: FileList): void {
		const [progress$, response$] = this.uploadSvc.upload(files.item(0));

		this.progress = progress$.pipe(
			map(({ loaded, total }) => `${Math.round((100 * loaded) / total)}%`)
		);

		response$.subscribe((e) => {
			const { url } = e.body as any;

			this.svc.pushVidUrl(url[0]);
			this.svc.pushThumbUrl(url[1]);

			this.router.navigate(['add-clip']);
		});
	}
}
