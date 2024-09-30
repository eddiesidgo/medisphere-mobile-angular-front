import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PacientesPageRoutingModule } from './pacientes-routing.module';

import { PacientesPage } from './pacientes.page';

import { PacienteFormComponent } from './paciente-form/paciente-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PacientesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PacientesPage, PacienteFormComponent]
})
export class PacientesPageModule {}
