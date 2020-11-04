import { NgModule } from '@angular/core';

import { EditorService } from './editor.service';
import { UploadService } from './upload.service';

@NgModule({
	providers: [EditorService, UploadService],
})
export class CoreModule {}
