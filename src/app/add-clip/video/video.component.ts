import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { EditorService } from 'src/app/core/editor.service';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Router } from '@angular/router';

@Component({
	selector: 'app-video',
	templateUrl: './video.component.html',
	styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
	task: AngularFireUploadTask;
	progress: Observable<string>;
	downloadUrl: string;

	@ViewChild('inputVideo')
	inputVideo: ElementRef<HTMLInputElement>;

	constructor(
		private storage: AngularFireStorage,
		private service: EditorService,
		private router: Router
	) {}

	ngOnInit(): void {}

	clickUpload(): void {
		// Send req to local host
		// this.inputVideo.nativeElement.click();
	}

	InputChange(files: FileList): void {
		this.upload(files);
	}

	upload(files: FileList): void {
		const file = files.item(0);
		const path = `videos/${file.name}`;
		const ref = this.storage.ref(path);

		this.task = this.storage.upload(path, file);

		this.progress = this.task
			.percentageChanges()
			.pipe(map((e) => e.toFixed(0).toString() + '%'));

		this.task
			.snapshotChanges()
			.pipe(
				finalize(async () => {
					this.downloadUrl = await ref.getDownloadURL().toPromise();
					this.service.pushVidUrl(this.downloadUrl);
					this.router.navigate(['add-clip']);
				})
			)
			.subscribe();
	}
}
