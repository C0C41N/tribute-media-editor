import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { EditorService } from 'src/app/core/editor.service';
import { FFmpegService } from 'src/app/core/ffmpeg.service';
import { $log } from 'src/app/core/misc';

import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
	selector: 'app-convert',
	templateUrl: './convert.component.html',
	styleUrls: ['./convert.component.scss'],
})
export class ConvertComponent implements OnInit, AfterViewInit {
	disabled: boolean;

	@ViewChild('convert')
	btnRef: MatButton;
	btn: HTMLButtonElement;

	constructor(private srv: EditorService, private ffmpegSvc: FFmpegService) {}

	click = async (): Promise<void> => {
		const url = await this.ffmpegSvc.concatVids();

		this.downloadURL(url, 'concat.mp4');

		// this.ffmpegSvc.setProgress($log);
	};

	downloadURL(url: string, name: string) {
		const link = document.createElement('a');
		link.download = name;
		link.href = url;
		link.hidden = true;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	ngAfterViewInit(): void {
		this.btn = this.btnRef._elementRef.nativeElement;

		const $clicks = fromEvent(this.btn, 'click').pipe(debounceTime(1000));
		$clicks.subscribe(this.click);
	}

	ngOnInit(): void {
		this.srv.vidUrl.subscribe((e) => {
			this.disabled = e.length < 2;
		});
	}
}
