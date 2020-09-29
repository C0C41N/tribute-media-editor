import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../shared/material.module';
import { AddClipRoutingModule } from './add-clip-routing.module';
import { AddClipComponent } from './add-clip.component';

@NgModule({
	declarations: [AddClipComponent],
	imports: [CommonModule, AddClipRoutingModule, MaterialModule],
})
export class AddClipModule {}
