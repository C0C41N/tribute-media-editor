import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EditorService } from '../shared/editor.service';
import { MaterialModule } from '../shared/material.module';
import { AddClipRoutingModule } from './add-clip-routing.module';
import { AddClipComponent } from './add-clip.component';

@NgModule({
	declarations: [AddClipComponent],
	imports: [CommonModule, AddClipRoutingModule, MaterialModule],
	providers: [EditorService],
})
export class AddClipModule {}
