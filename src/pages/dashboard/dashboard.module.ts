import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardPage } from './dashboard';
// Import ionic2-rating module
import { Ionic2RatingModule } from 'ionic2-rating';
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
    DashboardPage,
    SearchFilter
  ],
  imports: [
    IonicPageModule.forChild(DashboardPage),
    Ionic2RatingModule
  ],
})
export class DashboardPageModule {}
