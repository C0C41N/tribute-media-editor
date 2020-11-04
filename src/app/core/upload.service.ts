import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UploadService {
	constructor(private http: HttpClient) {}

	private url = 'http://localhost:3000';

	upload(): void {
		this.http.post(this.url, { hello: 'testing' }).subscribe((e) => {
			console.log(e);
		});
	}
}
