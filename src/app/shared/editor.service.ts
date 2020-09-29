import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable()
export class EditorService {
	private selectedSource = new BehaviorSubject<number>(0);
	selected = this.selectedSource.asObservable();

	constructor() {}

	setSelected(val: number): void {
		this.selectedSource.next(val);
	}
}
