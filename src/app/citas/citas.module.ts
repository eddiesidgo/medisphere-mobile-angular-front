import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CitasPageRoutingModule } from './citas-routing.module';
import { CitasPage } from './citas.page';
import { FullCalendarModule } from '@fullcalendar/angular'; // Asegúrate de importar FullCalendarModule
import { CitaFormComponent } from './cita-form/cita-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CitasPageRoutingModule,
    FullCalendarModule, // Agrega FullCalendarModule aquí
    ReactiveFormsModule // Agrega ReactiveFormsModule aquí
  ],
  declarations: [CitasPage, CitaFormComponent]
})
export class CitasPageModule {}
