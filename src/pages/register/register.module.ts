import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';
import { IonSimpleWizardModule } from '../../components/ion-simple-wizard/ion-simple-wizard.module';

@NgModule({
  declarations: [
    RegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterPage),
    IonSimpleWizardModule
  ],exports: [RegisterPage]
})
export class RegisterPageModule {}
