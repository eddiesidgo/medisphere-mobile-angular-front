import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.scss'],
})
export class DoctorFormComponent  implements OnInit {
  @Input() doctor: any;
  @Output() onSubmit = new EventEmitter<any>();
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private modalController: ModalController ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nombre: [this.doctor?.nombre || ''],
      apellido: [this.doctor?.apellido || ''],
      especialidad: [this.doctor?.especialidad || '']
    });
  }

  submitForm() {
    const doctorData = {...this.form.value, id: this.doctor?.id || null };
    console.log('Datos del doctor que se envían al componente padre:', doctorData);
    this.modalController.dismiss(doctorData);
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
