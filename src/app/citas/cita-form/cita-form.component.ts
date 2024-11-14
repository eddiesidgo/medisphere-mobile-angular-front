import { ModalController } from '@ionic/angular';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CitasService } from 'src/app/services/citas.service';
import { PacientesService } from 'src/app/services/pacientes.service'; // Servicio para pacientes
import { DoctoresService } from 'src/app/services/doctores.service'; // Servicio para doctores

@Component({
  selector: 'app-cita-form',
  templateUrl: './cita-form.component.html',
  styleUrls: ['./cita-form.component.scss'],
})
export class CitaFormComponent implements OnInit {
  @Input() cita: any;
  @Output() onSubmit = new EventEmitter<any>();
  citaForm!: FormGroup;
  pacientes: any[] = [];
  doctores: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private citasService: CitasService,
    private pacientesService: PacientesService,
    private doctoresService: DoctoresService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    // Prellena el formulario si hay una cita seleccionada
    this.citaForm = this.formBuilder.group({
      doctor_id: [this.cita?.doctor_id || '', Validators.required],
      paciente_id: [this.cita?.paciente_id || '', Validators.required],
      title: [this.cita?.title || '', Validators.required],
      date: [this.cita?.date || '', Validators.required],
      estado: [this.cita?.estado || '', Validators.required],
    });
  
    this.loadPacientes();
    this.loadDoctores();
  }
  
  loadPacientes() {
    this.pacientesService.getPacientes().subscribe((pacientes) => {
      console.log('Pacientes cargados:', pacientes);
      this.pacientes = pacientes;
      this.initializeForm();  // Inicializa el formulario después de cargar los pacientes
    });
  }

  // Método para cargar los doctores
  loadDoctores() {
    this.doctoresService.getDoctores().subscribe((doctores) => {
      console.log('Doctores cargados:', doctores);
      this.doctores = doctores;
      this.initializeForm();  // Inicializa el formulario después de cargar los doctores
    });
  }

  // Inicializa el formulario
  initializeForm() {
    // Solo inicializa el formulario si los datos están cargados
    if (this.pacientes.length > 0 && this.doctores.length > 0) {
      this.citaForm = this.formBuilder.group({
        id: [this.cita?.id || ''],
        doctor_id: [this.cita?.doctor_id || '', Validators.required],
        paciente_id: [this.cita?.paciente_id || '', Validators.required],
        title: [this.cita?.title || '', Validators.required],
        date: [this.cita?.date || '', Validators.required],
        estado: [this.cita?.estado || '', Validators.required],
      });
    }
  }

  submitForm() {
    if (this.citaForm.valid) {
      const citaData = { ...this.citaForm.value, id: this.cita?.id || null };
      console.log('Datos de la cita que se envían al componente padre:', citaData);
      this.modalController.dismiss(citaData); // Envía el valor del formulario al modal
    } else {
      console.log('Formulario no válido');
    }
  }
  

  // Función para manejar el cambio de fecha
  onDateChange(event: any) {
    const selectedDate = event.detail.value;
    this.citaForm.patchValue({
      date: selectedDate,
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
