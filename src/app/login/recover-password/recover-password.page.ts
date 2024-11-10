import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage implements OnInit {
  MostrarPassword1 = false; 
  Passwords1 = '';  
  MostrarPassword2= false; 
  Passwords2 = '';  
  constructor(private toastController: ToastController, private router: Router) {}
    
  ngOnInit() {
    throw new Error('Metodo no implementado');
  }
  MostrarPasswords1() {
    this.MostrarPassword1 = !this.MostrarPassword1; 
}
MostrarPasswords2() {
  this.MostrarPassword2 = !this.MostrarPassword2; 
}
async BtnRegreso(position: 'top') {
  const toast = await this.toastController.create({
    message: 'Regresando...',
    duration: 500,
    position: position,
  });

  await toast.present();
  setTimeout(() => {
    this.router.navigate(['/login']);
  }, );
}
}
