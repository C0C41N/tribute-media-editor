import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddClipComponent } from './add-clip.component';

const routes: Routes = [
	{
		path: '',
		component: AddClipComponent,
		children: [
			{
				path: 'video',
				loadChildren: () =>
					import('./video/video.module').then(({ VideoModule }) => VideoModule),
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AddClipRoutingModule {}
