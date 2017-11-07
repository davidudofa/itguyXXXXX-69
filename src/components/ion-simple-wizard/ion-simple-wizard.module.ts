import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonSimpleWizard } from './ion-simple-wizard.component';
import { IonSimpleWizardStep } from './ion-simple-wizard.step.component';

@NgModule({
  declarations: [
    IonSimpleWizard,
    IonSimpleWizardStep,
  ],
  imports: [
    IonicPageModule.forChild(IonSimpleWizard),
  ],exports: [IonSimpleWizard, IonSimpleWizardStep]
})
export class IonSimpleWizardModule {}
