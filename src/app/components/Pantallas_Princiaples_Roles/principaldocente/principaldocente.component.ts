import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-principaldocente',
  templateUrl: './principaldocente.component.html',
  styleUrls: ['./principaldocente.component.css']
})
export class PrincipaldocenteComponent {
  id: string | null | undefined;
  correo: string  | null = "";
  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute){}

 ngOnInit(): void{
  this.id = this.aRouter.snapshot.paramMap.get('id');
 }
 contras(){
 
  Swal.fire({
    title: '¿Quiere cambiar su contraseña?',
    text: "Se le enviara un correo electronico donde podra cambiar la contraseña multimind",
    icon: 'question',
    iconColor: 'blue',
    showCancelButton: true,
    confirmButtonText: 'Enviar', 
    confirmButtonColor: 'Blue ',

  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      this.auth.currentUser.then(user => {
        if (user) {
          this.correo = user.email;
          if(this.correo){
          this.auth.sendPasswordResetEmail(this.correo).then(() =>{
          this.toastr.success('Verificar el correo', 'Se envio un correo electronico ');//damos bienvenida 
          }).catch((error) =>{
            this.toastr.error('Se produjo un problema', 'No se envio el correo para el restablecimiento de contraseña ');
          });
        }
        }else{
          this.toastr.error('Se produjo un problema', 'No se encontro al usuario ');
        }
      }).catch(error => {
      });

    }
  })
}
  
  alumno(){
      this.router.navigate(['/lista/'+ this.id]);
  }
}
