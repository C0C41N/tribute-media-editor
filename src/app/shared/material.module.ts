import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

const modules = [
	MatButtonModule,
	MatCardModule,
	MatGridListModule,
	MatIconModule,
];

@NgModule({
	imports: [...modules],
	exports: [...modules],
})
export class MaterialModule {}
