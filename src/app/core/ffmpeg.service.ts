import { Subject } from 'rxjs';

import { Injectable } from '@angular/core';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

import { $log } from './misc';

@Injectable()
export class FFmpegService {
	private ffmpeg = createFFmpeg();

	private loadedSource = new Subject<void>();
	loaded = this.loadedSource.asObservable();

	constructor() {}

	load = async () => {
		await this.ffmpeg.load();
		this.loadedSource.next();
	};

	async genThumb(file: File): Promise<string> {
		if (!this.ffmpeg.isLoaded()) {
			$log({ genThumb: 'ffmpeg not loaded' });
			return;
		}

		const cmd = '-ss 1 -i test.mp4 -vframes 1 -q:v 2 -vf scale=200:-1 out.png';

		const fetchedFile = await fetchFile(file);

		this.ffmpeg.FS('writeFile', 'test.mp4', fetchedFile);

		await this.ffmpeg.run(...cmd.split(' '));

		const data = this.ffmpeg.FS('readFile', 'out.png');

		return URL.createObjectURL(new Blob([data.buffer], { type: 'image/png' }));
	}
}
