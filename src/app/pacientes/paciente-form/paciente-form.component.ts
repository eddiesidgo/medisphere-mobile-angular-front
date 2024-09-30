import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-paciente-form',
  templateUrl: './paciente-form.component.html',
  styleUrls: ['./paciente-form.component.scss'],
})
export class PacienteFormComponent implements OnInit {
  @Input() paciente: any; // Recibe datos del paciente si estamos editando
  @Output() onSubmit = new EventEmitter<any>(); // Emitir los datos cuando se envía el formulario
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private modalController: ModalController) {
  }

  ngOnInit() {
    // Inicializamos el formulario, si existe un paciente lo cargamos en el formulario
    this.form = this.formBuilder.group({
      nombre: [this.paciente?.nombre || ''],
      apellido: [this.paciente?.apellido || ''],
      dui: [this.paciente?.dui || ''],
      fecha_nacimiento: [this.paciente?.fecha_nacimiento || ''],
      genero: [this.paciente?.genero || '']
    });
  }

  submitForm() {
    const pacienteData = { ...this.form.value, id: this.paciente?.id || null }; // Asegura que el id esté presente si es una edición
    console.log('Datos del paciente que se envían al componente padre:', pacienteData); // Verifica si el id está aquí
    this.modalController.dismiss(pacienteData);
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
