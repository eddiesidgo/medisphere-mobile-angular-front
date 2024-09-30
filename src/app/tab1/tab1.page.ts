import { Component, OnInit } from '@angular/core';
import { PacientesService } from '../services/pacientes.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  totalPacientes: number = 0;

  constructor(private pacientesService: PacientesService) {}

  ngOnInit() {
    this.getPacientesCount();
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

}
