import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent  {

  id: string | undefined;
  forms:FormGroup;
  loading = false;
  perfil = 'estudiante';

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private auth: AngularFireAuth,
    ){
      this.forms = this.fb.group({
        email: ['',Validators.required],
      })
 }
 ngOnInit(): void{

 }
 modal(){
  Swal.fire({
    icon: 'error',
    title: 'Acceso denegado',
    text: 'Revise si todos los datos son correctos',
  })
 }

 login(){
const email = this.forms.value.email;
this.loading = true;
this.auth.sendPasswordResetEmail(email).then(() =>{

  this.loading = false;
  this.toastr.success('Verificar el correo', 'Se envio un correo electronico ');//damos bienvenida 
  this.router.navigate(['/inicio/']);

}).catch((error) =>{
  this.loading = false;
this.modalDocente();
});

}
modalDocente(){
  Swal.fire({
    icon: 'error',
    title: 'Correo no encontrado',
    text: 'Asegurate que el correo este escrito correctamente',
  })
 }


}

 
 
 

