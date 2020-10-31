import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../shared/material.module';
import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor.component';
import { CanvasComponent } from './canvas/canvas.component';
import { ViewComponent } from './view/view.component';

@NgModule({
	declarations: [EditorComponent, CanvasComponent, ViewComponent],
	imports: [CommonModule, MaterialModule, EditorRoutingModule],
})
export class EditorModule {}
