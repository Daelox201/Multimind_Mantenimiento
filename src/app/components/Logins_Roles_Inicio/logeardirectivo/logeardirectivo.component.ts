import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Firestore, collection, getDoc, doc } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { getDocs, query, where } from 'firebase/firestore';

@Component({
  selector: 'app-logeardirectivo',
  templateUrl: './logeardirectivo.component.html',
  styleUrls: ['./logeardirectivo.component.css']
})
export class LogeardirectivoComponent {
  id: string | undefined;
  forms: FormGroup;
  loading = false;
  perfil = 'directivo';

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

    const directivoCollectionRef = collection(this.firebase, 'directivo');
    const querySnapshot = await getDocs(query(directivoCollectionRef, where("correo", "==", email)));

    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (docSnap) => {
        const data = docSnap.data();
        const perfil = data['perfil'];
        const nombre = data['nombre'];
        const activo = data['activo'];
        const psw = data['contraseña'];
        this.id = data['id'];
        

        if (password === psw && activo === 'activo') {
          console.log(perfil)
          if (perfil === 'Directivo') {
            if (this.authService.login(perfil, activo)) {
              this.toastr.success('Inicio de sesión correcto', 'Bienvenido ' + nombre);
              this.router.navigate(['/principalDirector/' + this.id]);
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
