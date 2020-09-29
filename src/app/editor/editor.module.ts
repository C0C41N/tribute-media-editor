import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../shared/material.module';
import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor.component';

@NgModule({
	declarations: [EditorComponent],
	imports: [CommonModule, MaterialModule, EditorRoutingModule],
})
export class EditorModule {}
