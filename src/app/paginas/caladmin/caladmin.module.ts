import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CaladminPageRoutingModule } from './caladmin-routing.module';
import { CaladminPage } from './caladmin.page';
import { CalendarModule } from 'ion2-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CaladminPageRoutingModule,
    CalendarModule
  ],
  declarations: [CaladminPage]
})
export class CaladminPageModule {}
