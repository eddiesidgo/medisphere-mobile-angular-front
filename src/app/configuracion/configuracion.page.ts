import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from '../services/login-service.service';
import { personCircle, personCircleOutline, sunny, sunnyOutline } from 'ionicons/icons';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {
  paletteToggle = false;
  name: string | null = '';

  constructor(
    private router: Router,
    private translate: TranslateService,
    private loginService: LoginService
  ) { 
    this.translate.setDefaultLang('en'); 
    addIcons({ personCircle, personCircleOutline, sunny, sunnyOutline });
  }

  ngOnInit() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: light)');
    this.initializeDarkPalette(prefersDark.matches);
    prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches));

 
    this.name = this.loginService.getUsername();
  }

  initializeDarkPalette(isDark: boolean) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }

  toggleChange(ev: { detail: { checked: any; }; }) {
    this.toggleDarkPalette(ev.detail.checked);
  }

  toggleDarkPalette(shouldAdd: boolean | undefined) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  }

  goTo(section: string) {
    this.router.navigate([`/${section}`]);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('name'); // Elimina también el nombre al cerrar sesión
    this.router.navigate(['/login']); 
  }

  changeLanguage(lang: string) {
    this.translate.use(lang); // Cambia el idioma
  }
}
