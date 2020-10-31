import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class EditorService {
	private selectedSource = new BehaviorSubject<number>(0);
	selected = this.selectedSource.asObservable();

	private vidUrlSource = new BehaviorSubject<string[]>([]);
	vidUrl = this.vidUrlSource.asObservable();

	constructor(private router: Router) {}

	setSelected(val: number): void {
		this.selectedSource.next(val);
	}

	pushVidUrl(val: string): void {
		this.vidUrlSource.next([...this.vidUrlSource.value, val]);
	}

	clickAdd(): void {
		this.setSelected(2);
		this.router.navigate(['add-clip']);
	}
}
