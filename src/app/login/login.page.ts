import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private toastController: ToastController, private router: Router) {}

  ngOnInit() {
    throw new Error('Metodo no implementado');

  }
  async Btnlogin(position: 'top') {
    const toast = await this.toastController.create({
      message: 'Ingresando a inicio de sesión',
      duration: 500,
      position: position,
    });

    await toast.present();
    setTimeout(() => {
      this.router.navigate(['/loginpage']);
    }, );
  }
  async BtnPassword(position: 'top') {
    const toast = await this.toastController.create({
      message: 'Ingresando a recuperación de contraseña',
      duration: 500,
      position: position,
    });

    await toast.present();
    setTimeout(() => {
      this.router.navigate(['/recover-password']);
    }, );
  }
}
