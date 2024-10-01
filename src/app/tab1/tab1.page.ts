import { Component, OnInit } from '@angular/core';
import { PacientesService } from '../services/pacientes.service';
import { NotificationService } from '../services/notification.service';
import { DoctoresService } from '../services/doctores.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  totalPacientes: number = 0;
  totalDoctores: number = 0;
  pacientes: any[] = [];
  doctores: any[] = [];

  constructor(private pacientesService: PacientesService, private doctoresService: DoctoresService , private notificationService: NotificationService) {}

  ngOnInit() {
    this.getPacientesCount();

     // Suscribirse a las notificaciones
     this.notificationService.pacienteAgregado$.subscribe(() => {
      this.getPacientesCount(); // Actualiza el contador de pacientes cuando se agrega uno

    });

    this.getDoctoresCount();
    this.notificationService.doctorAgregado$.subscribe(() => {
      this.getDoctoresCount(); // Actualiza el contador de doctores cuando se agrega uno
    });
  }

  // Método para obtener todos los pacientes usando el servicio
  getPacientes() {
    this.pacientesService.getPacientes().subscribe(
      (data) => {
        this.pacientes = data;
        this.totalPacientes = data.length; // Actualiza el contador de pacientes
      },
      (error) => {
        console.error('Error al obtener pacientes:', error);
      }
    );
  }

  getPacientesCount() {
    this.pacientesService.getPacientes().subscribe(
      (data) => {
        this.totalPacientes = data.length; // Obtén el total de pacientes
      },
      (error) => {
        console.error('Error al obtener el total de pacientes:', error);
      }
    );
  }

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

  getDoctoresCount(){
    this.doctoresService.getDoctores().subscribe(
      (data) => {
        this.totalDoctores = data.length; // Obtén el total de pacientes
      },
      (error) => {
        console.error('Error al obtener el total de doctores:', error);
      }
    );
  }
}
