import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditorComponent } from './editor.component';

const routes: Routes = [
	{
		path: 'edit',
		component: EditorComponent,
		children: [
			{
				path: 'preview',
			},
			{
				path: 'add-clip',
				loadChildren: () =>
					import('src/app/add-clip/add-clip.module').then(
						({ AddClipModule }) => AddClipModule
					),
			},
			{
				path: 'music',
			},
			{
				path: 'restore',
			},
		],
	},
	{
		path: '',
		redirectTo: 'edit',
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class EditorRoutingModule {}
