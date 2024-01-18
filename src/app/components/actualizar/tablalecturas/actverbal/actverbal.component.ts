import {  Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { newlectura } from 'src/app/models/newlectura';
import { LecturaService } from 'src/app/services/lectura.service';
@Component({
  selector: 'app-actverbal',
  templateUrl: './actverbal.component.html',
  styleUrls: ['./actverbal.component.css']
})
export class ActverbalComponent {
  id: string | null | undefined;
  form:FormGroup;
  R1: string = '';
  R2: string = '';
  R3: string = '';
  R4: string = '';
  R5: string = '';
  respuestas: any[] = [
    {value: 'Verdadero', nombre: 'Verdadero'},
    {value: 'Falso', nombre: 'Falso'}
  ];

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private newlectura: LecturaService){
      this.form = this.fb.group({
        titulo: ['', [Validators.required]],
        lectura: ['', [Validators.required]],
        preg1: ['', [Validators.required]],
        preg2: ['', [Validators.required]],
        preg3: ['', [Validators.required]],
        preg4: ['', [Validators.required]],
        preg5: ['', [Validators.required]],
        resp1: ['', [Validators.required]],
        resp2: ['', [Validators.required]],
        resp3: ['', [Validators.required]],
        resp4: ['', [Validators.required]],
        resp5: ['', [Validators.required]],
      })

    }

     ngOnInit(){
      this.id = this.aRouter.snapshot.paramMap.get('id');

    }  
crear(){
  const lectura: newlectura = {
   
    titulo : this.form.value.titulo,
    lectura : this.form.value.lectura,
    preg1 : this.form.value.preg1,
    preg2 : this.form.value.preg2,
    preg3 : this.form.value.preg3 ,
    preg4 : this.form.value.preg4 ,
    preg5 : this.form.value.preg5 ,
    resp1 : this.form.value.resp1 ,
    resp2 : this.form.value.resp2 ,
    resp3 : this.form.value.resp3 ,
    resp4 : this.form.value.resp4 ,
    resp5 : this.form.value.resp5 ,
  }
  
  this.newlectura.registro(lectura).then((user) =>{
   
      lectura.id = user.id;
      this.newlectura.doc(lectura);
      this.toastr.success('El registro fue exitoso', 'Registro completado');
       this.router.navigate(['listaLecturas/'+ this.id ]);
   

  }, error =>{
    this.toastr.error('La lectura no se registro', 'Error');
    this.router.navigate(['actualizar/'+ this.id ]);
  });
}

}
