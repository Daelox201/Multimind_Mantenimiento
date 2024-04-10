import {  Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { newpalabra } from 'src/app/models/newpalabra';
import { PalabraService } from 'src/app/services/palabra.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-resgistro-palabras',
  templateUrl: './resgistro-palabras.component.html',
  styleUrls: ['./resgistro-palabras.component.css']
})
export class ResgistroPalabrasComponent{
  id: string | null | undefined;
  form:FormGroup;
  word1: string | undefined;
  word2: string | undefined;
  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private palabra: PalabraService){
      this.form = this.fb.group({
        palabra: ['', [Validators.required]],
        palabra2: ['', [Validators.required]],
      })
    }
     ngOnInit(){
      this.id = this.aRouter.snapshot.paramMap.get('id');
    }  
crear(){
  this.word1 = this.form.value.palabra;
  this.word2 = this.form.value.palabra2;
if(this.word1 === this.word2){
  const newPlabra: newpalabra={
    palabra: this.form.value.palabra,
  }
  this.palabra.registro(newPlabra).then((user) =>{
      newPlabra.id = user.id;
      this.palabra.doc(newPlabra);
      this.toastr.success('El registro fue exitoso', 'Registro completado');
       this.router.navigate(['tablaPalabra/'+ this.id ]);
  }, error =>{
    this.toastr.error('La lectura no se registro', 'Error');
    this.router.navigate(['tablaPalabra/'+ this.id ]);
  });
}else{
this.error();
}
}
 error(){
  Swal.fire({
    icon: 'error',
    title: 'Las palabras no son iguales',
    text: 'Revise si las palabras son iguales',
  })
 }
}

