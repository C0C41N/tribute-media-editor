import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable()
export class EditorService {
	selected = new BehaviorSubject<number>(0);

	constructor() {}
}
