import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EditorService } from '../shared/editor.service';
import { MaterialModule } from '../shared/material.module';
import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor.component';

@NgModule({
	declarations: [EditorComponent],
	imports: [CommonModule, MaterialModule, EditorRoutingModule],
	providers: [EditorService],
})
export class EditorModule {}
