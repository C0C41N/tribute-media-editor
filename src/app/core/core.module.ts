import { NgModule } from '@angular/core';

import { EditorService } from './editor.service';
import { FFmpegService } from './ffmpeg.service';

@NgModule({
	providers: [EditorService, FFmpegService],
})
export class CoreModule {}
