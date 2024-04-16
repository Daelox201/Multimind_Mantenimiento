import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logearmaestro',
  templateUrl: './logearmaestro.component.html',
  styleUrls: ['./logearmaestro.component.css']
})
export class LogearmaestroComponent {

  id: string | undefined;
  forms: FormGroup;
  loading = false;
  perfil = 'docente';

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private auth: AngularFireAuth,
    private authService: AuthService,
    private firebase: Firestore
  ) {
    this.forms = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async login() {
    const email = this.forms.value.email;
    const password = this.forms.value.password;

    const docenteCollectionRef = collection(this.firebase, 'docente');
    const querySnapshot = await getDocs(query(docenteCollectionRef, where("correo", "==", email)));

    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (docSnap) => {
        const data = docSnap.data();
        const perfil = data['perfil'];
        const nombre = data['nombre'];
        const activo = data['activo'];
        const psw = data['contraseña'];
        this.id = data['id'];

        if (password === psw && activo === 'activo') {
          if (perfil === 'Docente') {
            console.log( this.perfil);
            console.log(this.authService.login(this.perfil, activo));
            if (this.authService.login(this.perfil, activo)) {
              
              this.toastr.success('Inicio de sesión correcto', 'Bienvenido ' + nombre);
              this.router.navigate(['/principalDocente/' + this.id]);
            }
          } else {
            this.modal();
          }
        } else {
          this.modal();
        }
      });
    } else {
      this.modal();
    }
  }

  modal() {
    Swal.fire({
      icon: 'error',
      title: 'Acceso denegado',
      text: 'Revise si todos los datos son correctos',
    });
  }

  contra() {
    this.router.navigate(['/recuperar/']);
  }
}
