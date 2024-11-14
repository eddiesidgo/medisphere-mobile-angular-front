import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-consulta-form',
  templateUrl: './consulta-form.component.html',
})
export class ConsultaFormComponent {
  @Input() consulta: any; // Datos de la consulta seleccionada
  consultaForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) {
    this.consultaForm = this.formBuilder.group({
      id: [''],
      diagnostico: ['', Validators.required],
      cita_id: ['', Validators.required],
      // Otros campos del formulario si son necesarios
    });
  }

  ngOnInit() {
    if (this.consulta) {
      this.consultaForm.patchValue(this.consulta); // Pasa los datos de la consulta seleccionada al formulario
    }
  }

  submitForm() {
    if (this.consultaForm.valid) {
      this.modalController.dismiss(this.consultaForm.value);
    }
  }

  close() {
    this.modalController.dismiss();
  }
}
