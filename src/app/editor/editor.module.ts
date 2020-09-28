import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../shared/material.module';
import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor.component';
import { EditorService } from './editor.service';

@NgModule({
	declarations: [EditorComponent],
	imports: [CommonModule, MaterialModule, EditorRoutingModule],
	providers: [EditorService],
})
export class EditorModule {}
