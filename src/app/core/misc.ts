export function $log(e: any, json: boolean = true): void {
	if (typeof e !== 'object') {
		e = { log: e };
	}
	if (json) {
		e = JSON.stringify(e, null, '\t');
	}
	console.log(e);
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
