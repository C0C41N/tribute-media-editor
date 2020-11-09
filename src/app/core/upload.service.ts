import { Observable } from 'rxjs';

import { HttpClient, HttpEventType, HttpProgressEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { partitionTwo } from '../core/misc';
import { randomKey, url } from './misc';

@Injectable()
export class UploadService {
	constructor(private http: HttpClient) {}

	upload(file: File): [progress$, complete$] {
		const name = `${randomKey(8)}.mp4`;
		const formData = new FormData();

		formData.append('uploads', file, name);
		formData.append('cmd', 'upload');
		formData.append('name', name);

		const upload$ = this.http.post(url, formData, {
			reportProgress: true,
			observe: 'events',
		});

		return partitionTwo(
			upload$,
			(e) => e.type === HttpEventType.UploadProgress,
			(e) => e.type === HttpEventType.Response
		) as [progress$, complete$];
	}
}

export type progress$ = Observable<HttpProgressEvent>;
export type complete$ = Observable<HttpResponse<object>>;
