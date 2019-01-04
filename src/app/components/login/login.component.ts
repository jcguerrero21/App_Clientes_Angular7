import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  titulo: string = 'Iniciar Sesión';
  usuario: Usuario;

  constructor(private _authService: AuthService, private _router: Router) { 
    this.usuario = new Usuario();
  }

  ngOnInit() {
    if(this._authService.isAuthenticated()){
      swal('Login', `Hola ${this._authService.usuario.username} ya has hecho login`, 'info');
      this._router.navigate(['/clientes']);
    }
  }

  login(): void{
    console.log(this.usuario);
    if(this.usuario.username == null || this.usuario.password == null) {
      swal('Error Login', 'Username o password vacías!', 'error');
      return;
    }

    this._authService.login(this.usuario).subscribe(
      response => {
        this._authService.guardarUsuario(response.access_token);
        this._authService.guardarToken(response.access_token);

        let usuario = this._authService.usuario;
        this._router.navigate(['/clientes']);
        swal('Login', `Hola ${usuario.username}, has iniciado sesión con éxito`, 'success');
      },
      error => {
        if(error.status == 400){
          swal('Error Login', 'Usuario o clave incorrectas!', 'error');
        }
      }
    )
  }

}
