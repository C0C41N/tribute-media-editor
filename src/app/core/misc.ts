import { from, Observable, ObservableInput } from 'rxjs';
import { filter } from 'rxjs/operators';

export const url = 'http://localhost:3000';

export function $log(e: any): void {
	console.log(JSON.stringify(e, null, '\t'));
}

export function randomKey(len: number): string {
	// prettier-ignore
	const x = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C',
	'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
	'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g',
	'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
	'w', 'x', 'y', 'z']

	return Array(len)
		.fill(null)
		.reduce((a: string) => {
			return a.concat(x[Math.floor(Math.random() * x.length)]);
		}, '');
}

export function partitionTwo<T>(
	source: ObservableInput<T>,
	predicate: (value: T, index: number) => boolean,
	predicateTwo: (value: T, index: number) => boolean
): [Observable<T>, Observable<T>] {
	return [
		filter(predicate)(from(source)),
		filter(predicateTwo)(from(source)),
	] as [Observable<T>, Observable<T>];
}
