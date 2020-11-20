import { Observable } from 'rxjs';
import { EditorService } from 'src/app/core/editor.service';
import { FFmpegService } from 'src/app/core/ffmpeg.service';
import { $log } from 'src/app/core/misc';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
	selector: 'app-video',
	templateUrl: './video.component.html',
	styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
	progress: Observable<string>;
	downloadUrl: string;

	@ViewChild('inputVideo')
	inputVideo: ElementRef<HTMLInputElement>;

	constructor(
		private svc: EditorService,
		private router: Router,
		private ffmpegSvc: FFmpegService,
		private sanitizer: DomSanitizer
	) {}

	ngOnInit(): void {}

	clickUpload(): void {
		this.inputVideo.nativeElement.click();
	}

	async InputChange(files: FileList): Promise<void> {
		const file = files.item(0);

		this.svc.pushVidUrl(this.sanitize(URL.createObjectURL(file)));
		const thumb = await this.ffmpegSvc.genThumb(file);

		const sanitizedUrl = this.sanitize(thumb);
		this.svc.pushThumbUrl(sanitizedUrl);
		this.svc.pushThumbUrl(sanitizedUrl);
		this.svc.pushThumbUrl(sanitizedUrl);
		this.svc.pushThumbUrl(sanitizedUrl);
		this.svc.pushThumbUrl(sanitizedUrl);
		this.svc.pushThumbUrl(sanitizedUrl);
		this.svc.pushThumbUrl(sanitizedUrl);
		this.svc.pushThumbUrl(sanitizedUrl);
		this.svc.pushThumbUrl(sanitizedUrl);
		this.svc.pushThumbUrl(sanitizedUrl);
		this.router.navigate(['add-clip']);
	}

	sanitize(url: string): SafeUrl {
		return this.sanitizer.bypassSecurityTrustUrl(url);
	}
}
