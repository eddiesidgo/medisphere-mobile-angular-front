import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.page.html',
  styleUrls: ['./pacientes.page.scss'],
})
export class PacientesPage implements OnInit {
  pacientes: any[] = [];

  constructor() { }

  ngOnInit() {
    this.getPacientes();
  }

  getPacientes() {
    axios.get('http://127.0.0.1:8000/api/pacientes')
     .then(response => {
        this.pacientes = response.data;
      })
     .catch(error => {
        console.error('Error:', error);
      });
  }




  // data = [
  //   { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
  //   { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' }
  // ];

  // addNewRow() {
  //   const newId = this.data.length + 1;
  //   this.data.push({ id: newId, name: 'New User', email: `user${newId}@example.com` });
  // }

  // deleteRow(id: number) {
  //   this.data = this.data.filter(item => item.id !== id);
  // }

}
