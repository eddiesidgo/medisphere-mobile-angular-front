import { Component, OnInit } from '@angular/core';
import { ConsultasService } from '../services/consultas.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.page.html',
  styleUrls: ['./consultas.page.scss'],
})
export class ConsultasPage implements OnInit {
  consultas: any[] = [];

  constructor(private consultasService: ConsultasService) { }

  ngOnInit() {
    this.getConsultas();
  }

  getConsultas() {
    this.consultasService.getConsultas().subscribe((response: any) => {
      this.consultas = response;
    });
  }

}
