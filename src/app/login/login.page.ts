import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login-service.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';
  mostrarPassword: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

          mostrarPasswords() {
            this.mostrarPassword = !this.mostrarPassword;
          }

// Mostrar un alert cuando ocurra un error de autenticación
async showErrorAlert(message: string) {
  const alert = await this.alertController.create({
    header: 'Error',
    message: message,
    buttons: ['OK']
  });

  await alert.present();
}

// Manejar el envío del formulario de login
onSubmit() {
  this.loginService.login(this.email, this.password).subscribe(
    response => {
      if (response.token) {
        this.router.navigate(['/tabs/tab1']); // Redirige al home tras el login exitoso
      }
    },
    error => {
      console.error('Error de autenticación:', error);
      // Muestra un alert con el mensaje de error
      this.showErrorAlert('Correo o contraseña incorrectos, por favor intente nuevamente.');
    }
  );
}
}

