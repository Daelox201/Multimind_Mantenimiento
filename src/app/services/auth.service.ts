import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { AngularFirestore } from '@angular/fire/compat/firestore';// Asegúrate de que esta importación sea correcta

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private accessDocente = false;

  constructor(private firestore: AngularFirestore) { } // Asegúrate de que AngularFirestore se esté inyectando correctamente

  login(perfil: string, activo: string): boolean {
    // Lógica de autenticación simplificada
    if (perfil === 'Admin' || (perfil === 'Estudiante' && activo === 'activo') || 
        (perfil === 'Directivo' && activo === 'activo') || (perfil === 'docente' && activo === 'activo')) {
      this.isAuthenticated = true;
      return true;
    } else {
      this.showModal(perfil);
      return false;
    }
  }

  register(email: string, password: string, nombre: string): Promise<any> {
    return new Promise<any>((resolve, reject) => { // Especifica el tipo de retorno de la promesa
      // Simula un registro, reemplaza con tu lógica de autenticación
      if (email && password && nombre ) {
        // Agrega la información del estudiante a la colección "alumnos" en Firestore
        this.firestore.collection('alumnos').add({
          email,
          nombre,
          
        })
        .then((res: any) => { // Especifica el tipo de 'res'
          resolve({ success: true });
        })
        .catch((error: any) => { // Especifica el tipo de 'error'
          reject({ success: false });
        });
      } else {
        reject({ success: false });
      }
    });
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  modalDocente(){
    Swal.fire({
      icon: 'error',
      title: 'Cuenta inhabilitada',
      text: 'Contactate con un directivo para habilitar la cuenta',
    });
  }

  modalDirectivo(){
    Swal.fire({
      icon: 'error',
      title: 'Cuenta inhabilitada',
      text: 'Contactate con un Administrador para habilitar la cuenta',
    });
  }

  modal(){
    Swal.fire({
      icon: 'error',
      title: 'Cuenta inhabilitada',
      text: 'Contactate con tu tutor para habilitar la cuenta',
    });
  }

  private showModal(perfil: string): void {
    switch(perfil) {
      case 'Estudiante':
      case 'docente':
        this.modalDocente();
        break;
      case 'Directivo':
        this.modalDirectivo();
        break;
      default:
        this.modal();
        break;
    }
  }
}
