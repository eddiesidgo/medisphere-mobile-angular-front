import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctoresPageRoutingModule } from './doctores-routing.module';

import { DoctoresPage } from './doctores.page';
import { DoctorFormComponent } from './doctor-form/doctor-form.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctoresPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DoctoresPage, DoctorFormComponent]
})
export class DoctoresPageModule {}
