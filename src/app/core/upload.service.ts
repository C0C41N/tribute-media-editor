import { Observable } from 'rxjs';

import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { randomKey, url } from './misc';

@Injectable()
export class UploadService {
	constructor(private http: HttpClient) {}

	upload(file: File): Observable<HttpEvent<object>> {
		const name = `${randomKey(8)}.mp4`;
		const formData = new FormData();

		formData.append('uploads', file, name);
		formData.append('cmd', 'upload');
		formData.append('name', name);

		return this.http.post(url, formData, {
			reportProgress: true,
			observe: 'events',
		});
	}
}
