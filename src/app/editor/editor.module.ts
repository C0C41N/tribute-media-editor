import { CanvasComponent } from 'src/app/canvas/canvas.component';
import { ViewComponent } from 'src/app/view/view.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../shared/material.module';
import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor.component';
import { ConvertComponent } from './convert.component';

@NgModule({
	declarations: [EditorComponent, CanvasComponent, ViewComponent, ConvertComponent],
	imports: [CommonModule, MaterialModule, EditorRoutingModule],
})
export class EditorModule {}
