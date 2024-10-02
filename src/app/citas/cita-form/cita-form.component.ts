import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CitasService } from 'src/app/services/citas.service';

@Component({
  selector: 'app-cita-form',
  templateUrl: './cita-form.component.html',
  styleUrls: ['./cita-form.component.scss'],
})
export class CitaFormComponent  implements OnInit {
  citaForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private citasService: CitasService) {
    this.citaForm = this.formBuilder.group({
      doctor_id: ['', Validators.required],
      paciente_id: ['', Validators.required],
      title: ['', Validators.required],
      date: ['', Validators.required],
      estado: ['', Validators.required]
    });
   }

  ngOnInit() {}

  onSubmit() {
    if (this.citaForm.valid) {
      this.citasService.createCita(this.citaForm.value).subscribe((response) => {
        console.log('Cita creada con éxito:', response);
      },
    (error) => {
      console.error('Error al crear la cita:', error);
    });
    } else {
      console.error('Formulario no válido:');
    }
  }

  // Función para manejar el cambio de fecha
  onDateChange(event: any) {
    const selectedDate = event.detail.value;
    this.citaForm.patchValue({
      date: selectedDate
    });
  }

}
