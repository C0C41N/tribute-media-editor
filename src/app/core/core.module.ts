import { NgModule } from '@angular/core';

import { ApiService } from './api.service';
import { EditorService } from './editor.service';
import { UploadService } from './upload.service';

@NgModule({
	providers: [EditorService, UploadService, ApiService],
})
export class CoreModule {}
