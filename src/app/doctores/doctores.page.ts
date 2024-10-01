import { Component, OnInit } from '@angular/core';
import { DoctoresService } from '../services/doctores.service';
import { AlertController, ModalController } from '@ionic/angular';
import { DoctorFormComponent } from './doctor-form/doctor-form.component';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-doctores',
  templateUrl: './doctores.page.html',
  styleUrls: ['./doctores.page.scss'],
})
export class DoctoresPage implements OnInit {
  doctores: any[] = [];
  selectedDoctor: any;
  showForm = false;
  totalDoctores: number = 0;


  constructor(private doctoresService: DoctoresService, private modalController: ModalController, private alertController: AlertController, private notificationService: NotificationService) { }

  ngOnInit() {
    this.getDoctores();
  }

  // Obtener todos los doctores
  getDoctores() {
    this.doctoresService.getDoctores().subscribe(
      (data) => {
        this.doctores = data;
        this.totalDoctores = data.length; // Actualiza el contador de doctores
      },
      (error) => {
        console.error('Error al obtener doctores:', error);
      }
    );
  }

  // Abrir el modal para editar un doctor
  async openModal(doctor: any = null) {
    const modal = await this.modalController.create({
      component: DoctorFormComponent,
      componentProps: { doctor }, // Pasar el doctor seleccionado
    });


   // Escucha el evento del formulario
   modal.onDidDismiss().then((result) => {
    if (result.data) {
      this.handleFormSubmit(result.data);
    }
  });

  return await modal.present();
}

  // cerrar el modal
  closeModal() {
    this.showForm = false;
    this.selectedDoctor = null;
  }

  // manejar la logica de crear/actualizar doctor
  handleFormSubmit(doctorData: any) {
    // Verifica si el doctor tiene un ID. Si tiene, actualiza; si no, crea uno nuevo
    if (doctorData.id) {
      this.updateDoctor(doctorData);  // Llamar a updateDoctor cuando hay un id
    } else {
      this.createDoctor(doctorData);  // Llamar a createDoctor si no hay id
    }
  }

  // Método para crear un nuevo doctor usando el servicio
  createDoctor(doctorData: any) {
    this.doctoresService.createDoctor(doctorData).subscribe(
      (data) => {
        console.log('Doctor creado:', data);
        this.doctores.push(data);
        this.getDoctores();
        this.notificationService.notifyDoctorAgregado();
      },
      (error) => {
        console.error('Error al crear doctor:', error);
      }
    );
  }

  // Método para actualizar un doctor usando el servicio
  updateDoctor(doctorData: any) {
    this.doctoresService.updateDoctor(doctorData.id, doctorData).subscribe(
      (data) => {
        console.log('Doctor actualizado:', data);
        // Actualiza el doctor en el frontend
        const index = this.doctores.findIndex(d => d.id === doctorData.id);
        this.getDoctores();
        if (index > -1) {
          this.doctores[index] = data;
        }
      },
      (error) => {
        console.error('Error al actualizar doctor:', error);
      }
    );
  }

  // Método para eliminar un doctor
  deleteDoctor(id: number) {
    this.doctoresService.deleteDoctor(id).subscribe(
      () => {
        // Elimina el doctor del frontend
        this.doctores = this.doctores.filter(d => d.id!== id);
        this.getDoctores(); // Actualiza la lista completa de doctores
        this.notificationService.notifyDoctorAgregado(); // Notifica que se ha eliminado un doctor
      },
      (error) => {
        console.error('Error al eliminar doctor:', error);
      }
    );
  }

  // Método para confirmar la eliminacion
  async confirmDelete(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: `¿Estás seguro de que deseas eliminar el doctor?`,
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
            this.deleteDoctor(id);
          }
        }
      ]
    });
    await alert.present();
  }

}
