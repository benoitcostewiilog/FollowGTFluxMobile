import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ColisEditPage } from './colis-edit';

@NgModule({
  declarations: [
    ColisEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ColisEditPage)
  ],
  exports: [
    ColisEditPage
  ]
})
export class ColisEditPageModule { }
