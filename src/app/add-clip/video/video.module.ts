import { MaterialModule } from 'src/app/shared/material.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VideoRoutingModule } from './video-routing.module';
import { VideoComponent } from './video.component';

@NgModule({
	declarations: [VideoComponent],
	imports: [CommonModule, VideoRoutingModule, MaterialModule],
})
export class VideoModule {}
