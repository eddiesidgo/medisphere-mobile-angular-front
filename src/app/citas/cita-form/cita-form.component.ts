import { ModalController } from '@ionic/angular';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CitasService } from 'src/app/services/citas.service';


@Component({
  selector: 'app-cita-form',
  templateUrl: './cita-form.component.html',
  styleUrls: ['./cita-form.component.scss'],
})
export class CitaFormComponent  implements OnInit {
  @Input() cita: any;
  // @Input() patients: any[] = [];
  @Output() onSubmit = new EventEmitter<any>();
  citaForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private citasService: CitasService, private modalController: ModalController) {

   }

  ngOnInit() {
    this.citaForm = this.formBuilder.group({
      doctor_id: [this.cita?.doctor_id || ''],
      paciente_id: [this.cita?.paciente_id || ''],
      title: [this.cita?.title || ''],
      date: [this.cita?.date || ''],
      estado: [this.cita?.estado || '']
    });
  }

  // onSubmit() {
  //   if (this.citaForm.valid) {
  //     this.citasService.createCita(this.citaForm.value).subscribe((response) => {
  //       console.log('Cita creada con éxito:', response);
  //       this.citaForm.reset(); // Resetear el formulario para nuevos datos
  //     },
  //   (error) => {
  //     console.error('Error al crear la cita:', error);
  //   });
  //   } else {
  //     console.error('Formulario no válido:');
  //   }
  // }

  submitForm(){
    const citaData = { ...this.citaForm.value, id: this.cita?.id || null};
    console.log('Datos de la cita que se envían al componente padre:', citaData);
    this.modalController.dismiss(citaData);
  }

  // Función para manejar el cambio de fecha
  onDateChange(event: any) {
    const selectedDate = event.detail.value;
    this.citaForm.patchValue({
      date: selectedDate
    });
  }

  closeModal(){
    this.modalController.dismiss();
  }

}
