import {  Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { interpersonal } from 'src/app/models/interpersonal';
import { InterpreguntaService } from 'src/app/services/interpregunta.service';

@Component({
  selector: 'app-registropregu',
  templateUrl: './registropregu.component.html',
  styleUrls: ['./registropregu.component.css']
})
export class RegistropreguComponent {
  
  id: string | null | undefined;
  form:FormGroup;
  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private crearpregunta: InterpreguntaService){
      this.form = this.fb.group({
        preg: ['', [Validators.required]],
        correcta: ['', [Validators.required]],
        mala1: ['', [Validators.required]],
        mala2: ['', [Validators.required]],
        mala3: ['', [Validators.required]],
      })
    }

     ngOnInit(){
      this.id = this.aRouter.snapshot.paramMap.get('id');
    }  
crear(){
  const preg: interpersonal={
    pregunta: this.form.value.preg,
    buena: this.form.value.correcta,
    mala1: this.form.value.mala1,
    mala2: this.form.value.mala2,
    mala3: this.form.value.mala3,
  }
  this.crearpregunta.registro(preg).then((user) =>{
      preg.id = user.id;
      this.crearpregunta.doc(preg);
      this.toastr.success('El registro fue exitoso', 'Registro completado');
      this.router.navigate(['tablaPreguntas/'+ this.id ]);
  }, error =>{
    this.toastr.error('La lectura no se registro', 'Error');
    this.router.navigate(['tablaPreguntas/'+ this.id ]);
  });
}
}
