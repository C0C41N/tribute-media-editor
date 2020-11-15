import { MaterialModule } from 'src/app/shared/material.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AddClipRoutingModule } from './add-clip-routing.module';
import { AddClipComponent } from './add-clip.component';

@NgModule({
	declarations: [AddClipComponent],
	imports: [CommonModule, AddClipRoutingModule, MaterialModule],
})
export class AddClipModule {}
