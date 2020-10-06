import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable()
export class EditorService {
	private selectedSource = new BehaviorSubject<number>(0);
	selected = this.selectedSource.asObservable();

	private vidUrlSource = new BehaviorSubject<string[]>([]);
	vidUrl = this.vidUrlSource.asObservable();

	constructor() {}

	setSelected(val: number): void {
		this.selectedSource.next(val);
	}

	pushVidUrl(val: string): void {
		this.vidUrlSource.next([...this.vidUrlSource.value, val]);
	}
}
