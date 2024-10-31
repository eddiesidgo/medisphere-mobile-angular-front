import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginService } from '../services/login-service.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.page.html',
  styleUrls: ['./loginpage.page.scss'],
})
export class LoginpagePage implements OnInit {
  email: string = '';
  password: string = '';
  mostrarPassword: boolean = false;


  //dice que el "loginService" no suitable injection token 'loginService' of class 'LoginService'
  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async BtnRegreso(position: 'top') {
    const toast = await this.toastController.create({
      message: 'Regresando...',
      duration: 100,
      position: position,
    });

    await toast.present();
    toast.onDidDismiss().then(() => {
      this.router.navigate(['/login']);
    });
  }

  mostrarPasswords() {
    this.mostrarPassword = !this.mostrarPassword;
  }


  async login() {
    try {
      const response = await this.loginService
        .login(this.email, this.password)
        .toPromise();
      if (response && response.success) {
        this.router.navigate(['/home']);
      } else {
        this.showToast('Credenciales incorrectas');
      }
    } catch (error) {
      this.showToast('Ocurrió un error en el inicio de sesión');
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }
}
