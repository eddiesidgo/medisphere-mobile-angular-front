import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-paciente-form',
  templateUrl: './paciente-form.component.html',
  styleUrls: ['./paciente-form.component.scss'],
})
export class PacienteFormComponent implements OnInit {
  @Input() paciente: any = null; // Recibe datos del paciente si estamos editando
  @Output() onSubmit = new EventEmitter<any>(); // Emitir los datos cuando se envía el formulario
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private modalController: ModalController) {
    this.form = this.formBuilder.group({
      nombre: [''],
      apellido: [''],
      dui: [''],
      fecha_nacimiento: [''],
      genero: [''],
    });
  }

  ngOnInit() {
    if (this.paciente) {
      this.form.patchValue(this.paciente); // Rellena el formulario con los datos del paciente
    }
  }

  submitForm() {
    this.modalController.dismiss(this.form.value); // Devuelve los datos del formulario al cerrar
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
