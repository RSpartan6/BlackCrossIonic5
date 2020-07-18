import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClasesalumnosPageRoutingModule } from './clasesalumnos-routing.module';

import { ClasesalumnosPage } from './clasesalumnos.page';

import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClasesalumnosPageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: ClasesalumnosPage
      }
    ])
  ],
  declarations: [ClasesalumnosPage]
})
export class ClasesalumnosPageModule {}
