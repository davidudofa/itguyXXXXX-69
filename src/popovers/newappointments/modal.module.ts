import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalAppointPage } from './modal';
import { AppointServiceProvider } from "../../providers/appointment-service/appointmentservice";
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchFilter'
})
export class SearchFilter implements PipeTransform {
    transform(items: any[], criteria: any): any {

        return items.filter(item =>{
           for (let key in item ) {
             if((""+item[key]).toLowerCase().includes(criteria.toLowerCase())){
                return true;
             }
           }
           return false;
        });
    }
}

@NgModule({
  declarations: [
    ModalAppointPage,
    SearchFilter
  ],
  imports: [
    IonicPageModule.forChild(ModalAppointPage),
  ],
  exports: [
    ModalAppointPage
  ],
  providers:[
    AppointServiceProvider
  ]
})
export class NewAppointmentModule {}
