import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor(private router: Router) { }

  login() {
    //TODO: Ir al backend
    //TODO: Tener un usuario almacenado en un servicio disponible en toda la aplicación.

    this.router.navigate(['./heroes']);

  }

}
