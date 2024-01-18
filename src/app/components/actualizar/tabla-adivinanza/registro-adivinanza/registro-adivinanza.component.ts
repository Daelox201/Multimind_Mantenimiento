import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { newadivinanza } from 'src/app/models/newadivinanza';
import { AdivinanzaService } from 'src/app/services/adivinanza.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-registro-adivinanza',
  templateUrl: './registro-adivinanza.component.html',
  styleUrls: ['./registro-adivinanza.component.css']
})
export class RegistroAdivinanzaComponent {
  form:FormGroup;
  id: string | null | undefined;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private registro: AdivinanzaService){
      this.form = this.fb.group({
        adivinanza: ['', [Validators.required]],
        pista: ['', [Validators.required]],
        respuesta: ['', [Validators.required]],
        respuesta2: ['', [Validators.required]],
      })
    }
    async ngOnInit(){
      this.id = this.aRouter.snapshot.paramMap.get('id');
    }
    crear(){
      if(this.form.value.respuesta === this.form.value.respuesta2){
      const adi:newadivinanza={
        adivinanza: this.form.value.adivinanza,
        pista: this.form.value.pista,
        palabra: this.form.value.respuesta
      }
      this.registro.registro(adi).then((users)=>{
        adi.id = users.id;
        this.registro.doc(adi)
        this.toastr.success('El registro fue exitoso', 'Registro completado');
        this.router.navigate(['tablaAdivinanza/'+ this.id ]);
  
   }, error =>{
     this.toastr.error('La lectura no se registro', 'Error');
     this.router.navigate(['tablaAdivinanza/'+ this.id ]);
   });
  }else{
    Swal.fire({
      title: 'Las respuestas son incorrectas',
      text: "Verifique ambas respuestas que sean exactamente iguales",
      icon: 'warning',
      iconColor: 'red',
      showCancelButton: false,
      confirmButtonText: 'Ok', 

    })
  
  }
    }
}
