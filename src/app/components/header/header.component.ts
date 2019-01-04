import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  titulo: string = 'CLIENTES APP';

  constructor(private _authService: AuthService, private _router: Router) {
  }

  ngOnInit() {
  }

  logout(): void {
    let username = this._authService.usuario.nombre;
    this._authService.logout();
    swal('Logout', `Hola ${username} has cerrado sesión con éxito`, 'success');
    this._router.navigate(['/login']);
  }

}
