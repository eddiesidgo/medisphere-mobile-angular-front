import { Component, OnInit } from '@angular/core';
import { PacientesService } from '../services/pacientes.service'; // Importa el servicio
import { AlertController, ModalController } from '@ionic/angular';
import { PacienteFormComponent } from './paciente-form/paciente-form.component';
import { NotificationService } from '../services/notification.service';


@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.page.html',
  styleUrls: ['./pacientes.page.scss'],
})
export class PacientesPage implements OnInit {
  pacientes: any[] = [];
  selectedPaciente: any;
  showForm = false;
  totalPacientes: number = 0;

  constructor(private pacienteService: PacientesService, private modalController: ModalController, private alertController: AlertController, private notificationService: NotificationService) {}

  ngOnInit() {
    this.getPacientes();
  }

  // Método para obtener todos los pacientes usando el servicio
  getPacientes() {
    this.pacienteService.getPacientes().subscribe(
      (data) => {
        this.pacientes = data;
        this.totalPacientes = data.length; // Actualiza el contador de pacientes
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
  // Verifica si el paciente tiene un ID. Si tiene, actualiza; si no, crea uno nuevo
  if (pacienteData.id) {
    this.updatePaciente(pacienteData);  // Llamar a updatePaciente cuando hay un id
  } else {
    this.createPaciente(pacienteData);  // Llamar a createPaciente si no hay id
  }
}

  // Método para crear un nuevo paciente usando el servicio
  createPaciente(pacienteData: any) {
    this.pacienteService.createPaciente(pacienteData).subscribe(
      (data) => {
        console.log('Paciente creado:', data);
        this.pacientes.push(data);
        this.getPacientes(); // Esto actualizará la lista completa de pacientes
        this.notificationService.notifyPacienteAgregado(); // Notifica que se ha agregado un paciente
      },
      (error) => {
        console.error('Error al crear paciente:', error);
      }
    );
  }

 // Método para actualizar un paciente usando el servicio
updatePaciente(pacienteData: any) {
  this.pacienteService.updatePaciente(pacienteData.id, pacienteData).subscribe(
    (data) => {
      console.log('Paciente actualizado:', data);
      // Actualiza la lista de pacientes en el frontend
      const index = this.pacientes.findIndex(p => p.id === pacienteData.id);
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
        this.getPacientes(); // Esto actualizará la lista completa de pacientes
        this.notificationService.notifyPacienteAgregado(); // Notifica que se ha agregado un paciente
      },
      (error) => {
        console.error('Error al eliminar paciente:', error);
      }
    );
  }

   // Método para confirmar la eliminación
   async confirmDelete(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar este paciente?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Eliminación cancelada');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.deletePaciente(id); // Llamar al método de eliminar paciente si se confirma
          }
        }
      ]
    });

    await alert.present();
  }
}



