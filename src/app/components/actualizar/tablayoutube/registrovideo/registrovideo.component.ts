import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VideoService } from 'src/app/services/video.service';
import { newvideo } from 'src/app/models/newvideo';

@Component({
  selector: 'app-registrovideo',
  templateUrl: './registrovideo.component.html',
  styleUrls: ['./registrovideo.component.css']
})
export class RegistrovideoComponent  {
  id: string | null | undefined;
  form:FormGroup;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private crearvideo: VideoService){
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
  const video: newvideo={
    nombre: this.form.value.titulo,
    Descripcion: this.form.value.Descripcion,
    src: this.form.value.SRC
  }
  
  this.crearvideo.registro(video).then((user) =>{
      video.id = user.id;
      this.crearvideo.doc(video);
      this.toastr.success('El registro fue exitoso', 'Registro completado');
       this.router.navigate(['tablaKinestesica/'+ this.id ]);
   

  }, error =>{
    this.toastr.error('La lectura no se registro', 'Error');
    this.router.navigate(['tablaKinestesica/'+ this.id ]);
  });
}

}

