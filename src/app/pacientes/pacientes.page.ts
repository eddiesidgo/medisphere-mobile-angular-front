import { Component, OnInit } from '@angular/core';
import { PacientesService } from '../services/pacientes.service'; // Importa el servicio
import { ModalController } from '@ionic/angular';
import { PacienteFormComponent } from './paciente-form/paciente-form.component';


@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.page.html',
  styleUrls: ['./pacientes.page.scss'],
})
export class PacientesPage implements OnInit {
  pacientes: any[] = [];
  selectedPaciente: any = null;
  showForm = false;

  constructor(private pacienteService: PacientesService, private modalController: ModalController) {}

  ngOnInit() {
    this.getPacientes();
  }

  // Método para obtener todos los pacientes usando el servicio
  getPacientes() {
    this.pacienteService.getPacientes().subscribe(
      (data) => {
        this.pacientes = data;
      },
      (error) => {
        console.error('Error al obtener pacientes:', error);
      }
    );
  }

// Método para abrir el modal
async openModal(paciente: any = null) {
  const modal = await this.modalController.create({
    component: PacienteFormComponent,
    componentProps: { paciente }, // Pasa el paciente seleccionado
  });

  // Escucha el evento del formulario
  modal.onDidDismiss().then((result) => {
    if (result.data) {
      this.handleFormSubmit(result.data);
    }
  });

  return await modal.present();
}

  // Cerrar el modal
  closeModal() {
    this.showForm = false;
    this.selectedPaciente = null;
  }

 // Manejar la lógica de crear/actualizar paciente
 handleFormSubmit(pacienteData: any) {
  if (pacienteData.id) {
    this.updatePaciente(pacienteData);
  } else {
    this.createPaciente(pacienteData);
  }
}

  // Método para crear un nuevo paciente usando el servicio
  createPaciente(pacienteData: any) {
    this.pacienteService.createPaciente(pacienteData).subscribe(
      (data) => {
        console.log('Paciente creado:', data);
        this.pacientes.push(data);
      },
      (error) => {
        console.error('Error al crear paciente:', error);
      }
    );
  }

  // Método para actualizar un paciente usando el servicio
  updatePaciente(pacienteData: any) {
    this.pacienteService.updatePaciente(this.selectedPaciente.id, pacienteData).subscribe(
      (data) => {
        console.log('Paciente actualizado:', data);
        const index = this.pacientes.findIndex(p => p.id === this.selectedPaciente.id);
        if (index !== -1) {
          this.pacientes[index] = data;
        }
      },
      (error) => {
        console.error('Error al actualizar paciente:', error);
      }
    );
  }

  // Método para eliminar un paciente (si lo necesitas)
  deletePaciente(id: number) {
    this.pacienteService.deletePaciente(id).subscribe(
      () => {
        this.pacientes = this.pacientes.filter(p => p.id !== id);
      },
      (error) => {
        console.error('Error al eliminar paciente:', error);
      }
    );
  }
}
