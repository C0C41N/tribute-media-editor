import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () =>
			import('./editor/editor.module').then(({ EditorModule }) => EditorModule),
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			initialNavigation: 'enabled',
		}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
