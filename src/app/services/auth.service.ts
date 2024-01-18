import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private accessDocente = false;

  constructor( ) { }

  login(perfil: string, activo: string): boolean {
    // Lógica de autenticación
    if (perfil === 'Admin') {
      this.isAuthenticated = true;
      return true;
    }
    if (perfil === 'estudiante' ) {
      if(activo === 'success'){
      this.isAuthenticated = true;
      return true;
      }if(activo === 'danger'){
        this.modal();
        return false;
      }
    }


    if (perfil === 'directivo' ) {
    if(activo === 'success'){
        this.isAuthenticated = true;
        return true;
        }if(activo === 'danger'){
          this.modalDirectivo();
          return false;
        }


    }if (perfil === 'docente' ) {
      if(activo === 'success'){
        this.isAuthenticated = true;
        return true;
        }if(activo === 'danger'){
          this.modalDocente();
          return false;
        }
    }
     
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
  Docente(): boolean {
    return this.accessDocente;
  }
  modalDocente(){
    Swal.fire({
      icon: 'error',
      title: 'Cuenta inhabilitada',
      text: 'Contactate con un directivo para habilitar la cuenta',
    })
   }
   modalDirectivo(){
    Swal.fire({
      icon: 'error',
      title: 'Cuenta inhabilitada',
      text: 'Contactate con un Administrador para habilitar la cuenta',
    })
   }
  modal(){
    Swal.fire({
      icon: 'error',
      title: 'Cuenta inhabilitada',
      text: 'Contactate con tu tutor para habilitar la cuenta',
    })
   }
}
