import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { url } from './misc';

@Injectable()
export class ApiService {
	constructor(private http: HttpClient) {}

	registerHash(hash: string): void {
		const formData = new FormData();

		formData.append('cmd', 'registerHash');
		formData.append('hash', hash);

		this.http.post(url, formData).subscribe();
	}
}
