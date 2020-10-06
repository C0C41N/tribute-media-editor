import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyC8eh46oIbH5r-kgO97iOCAXT3nOQMDeaA',
	authDomain: 'editor-concept.firebaseapp.com',
	databaseURL: 'https://editor-concept.firebaseio.com',
	projectId: 'editor-concept',
	storageBucket: 'editor-concept.appspot.com',
	messagingSenderId: '845370265261',
	appId: '1:845370265261:web:9d2ae05b3531bfd73b4024',
};

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		AngularFireModule.initializeApp(firebaseConfig),
		AngularFireStorageModule,
	],
})
export class FirebaseModule {}
