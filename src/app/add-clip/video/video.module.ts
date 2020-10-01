import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../../shared/material.module';
import { VideoRoutingModule } from './video-routing.module';
import { VideoComponent } from './video.component';

@NgModule({
	declarations: [VideoComponent],
	imports: [CommonModule, VideoRoutingModule, MaterialModule],
})
export class VideoModule {}
