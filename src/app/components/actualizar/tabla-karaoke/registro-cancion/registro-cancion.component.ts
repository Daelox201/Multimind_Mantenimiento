import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { newcancion } from 'src/app/models/newcancion';
import { CancionService } from 'src/app/services/cancion.service';

@Component({
  selector: 'app-registro-cancion',
  templateUrl: './registro-cancion.component.html',
  styleUrls: ['./registro-cancion.component.css']
})
export class RegistroCancionComponent {
  id: string | null | undefined;
  form:FormGroup;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private crearcancion: CancionService){
      this.form = this.fb.group({
        titulo: ['', [Validators.required]],
        Descripcion: ['', [Validators.required]],
        SRC: ['', [Validators.required]],
      })

    }

     ngOnInit(){
      this.id = this.aRouter.snapshot.paramMap.get('id');

    }  
crear(){
  const cancion: newcancion={
    nombre: this.form.value.titulo,
    Descripcion: this.form.value.Descripcion,
    src: this.form.value.SRC
  }
  
  this.crearcancion.registro(cancion).then((user) =>{
      cancion.id = user.id;
      this.crearcancion.doc(cancion);
      this.toastr.success('El registro fue exitoso', 'Registro completado');
       this.router.navigate(['tablaKaraoke/'+ this.id ]);
   

  }, error =>{
    this.toastr.error('La lectura no se registro', 'Error');
    this.router.navigate(['tablaKaraoke/'+ this.id ]);
  });
}

}

