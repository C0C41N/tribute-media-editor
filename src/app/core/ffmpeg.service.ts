import { Subject } from 'rxjs';
import { EditorService } from 'src/app/core/editor.service';

import { Injectable } from '@angular/core';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

import { $log } from './misc';

@Injectable()
export class FFmpegService {
	private ffmpeg = createFFmpeg();

	private loadedSource = new Subject<void>();
	loaded = this.loadedSource.asObservable();

	setProgress = this.ffmpeg.setProgress;

	constructor(private svc: EditorService) {}

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

		await this.ffmpeg.FS('writeFile', 'test.mp4', fetchedFile);
		await this.ffmpeg.run(...cmd.split(' '));

		const data = await this.ffmpeg.FS('readFile', 'out.png');

		return URL.createObjectURL(new Blob([data.buffer], { type: 'image/png' }));
	}

	async concatVids(): Promise<string> {
		const files: File[] = this.svc.videosSource.value;

		const content = await files.reduce<Promise<string>>(
			async (text: Promise<string>, file: File, i: number) => {
				const fetchedFile = await fetchFile(file);
				const name = `file_${i}.mp4`;
				await this.ffmpeg.FS('writeFile', name, fetchedFile);
				return `${await text}file ${name}\n`;
			},
			Promise.resolve('')
		);

		await this.ffmpeg.FS('writeFile', 'text.txt', this.toUint8Array(content));

		const cmd = '-f concat -i text.txt -c copy out.mp4';
		await this.ffmpeg.run(...cmd.split(' '));

		const data = await this.ffmpeg.FS('readFile', 'out.mp4');

		return URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
	}

	private toUint8Array(text: string): Uint8Array {
		const encoded = new Uint8Array(text.length);
		encoded.forEach((_, i) => {
			encoded[i] = text.charCodeAt(i);
		});
		return encoded;
	}
}
