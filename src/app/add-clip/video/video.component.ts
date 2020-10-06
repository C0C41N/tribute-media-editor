import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

@Component({
	selector: 'app-video',
	templateUrl: './video.component.html',
	styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
	task: AngularFireUploadTask;
	progress: Observable<string>;
	downloadUrl: string;

	constructor(private storage: AngularFireStorage) {}

	ngOnInit(): void {}

	InputChange(files: FileList): void {
		this.upload(files);
	}

	clickUpload(): void {
		document.getElementById('InputVideo').click();
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
					console.log({ downloadURL: this.downloadUrl });
				})
			)
			.subscribe();
	}
}
