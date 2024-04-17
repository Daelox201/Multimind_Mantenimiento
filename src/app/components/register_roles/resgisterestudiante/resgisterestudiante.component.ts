import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-resgisterestudiante',
  templateUrl: './resgisterestudiante.component.html',
  styleUrls: ['./resgisterestudiante.component.css']
})
export class ResgisterestudianteComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nombre: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password, nombre, apellido } = this.registerForm.value;
      this.authService.register(email, password, nombre)
        .then(res => {
          console.log('Estudiante registrado con éxito!', res);
          // Realiza alguna acción post-registro, como redirigir o mostrar un mensaje
          // Si deseas agregar la información del estudiante a una colección,
          // puedes hacerlo aquí o en el servicio AuthService
        }).catch(error => {
          console.error('Error durante el registro:', error);
        });
    }
  }
}
