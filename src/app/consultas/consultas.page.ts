import { Component, OnInit } from '@angular/core';
import { ConsultasService } from '../services/consultas.service';
import { ModalController } from '@ionic/angular';
import { ConsultaFormComponent } from './consulta-form/consulta-form.component'; // Componente del formulario de edición

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.page.html',
  styleUrls: ['./consultas.page.scss'],
})
export class ConsultasPage implements OnInit {
  consultas: any[] = [];

  constructor(
    private consultasService: ConsultasService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.getConsultas();
  }

  getConsultas() {
    this.consultasService.getConsultas().subscribe((response: any) => {
      this.consultas = response;
    });
  }

  async openEditModal(consulta: any) {
    const modal = await this.modalController.create({
      component: ConsultaFormComponent,
      componentProps: { consulta }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.updateConsulta(result.data);
      }
    });

    return await modal.present();
  }

  updateConsulta(updatedConsulta: any) {
    this.consultasService.updateConsulta(updatedConsulta.id, updatedConsulta).subscribe(
      (response) => {
        console.log('Consulta actualizada:', response);
        // Actualizar el array de consultas
        const index = this.consultas.findIndex(c => c.id === updatedConsulta.id);
        if (index > -1) {
          this.consultas[index] = response;
        }
        this.getConsultas()
      },
      (error) => {
        console.error('Error al actualizar la consulta:', error);
      }
    );
  }
}
