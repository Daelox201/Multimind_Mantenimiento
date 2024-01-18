import {  Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, addDoc,getDoc, doc,setDoc,collection,collectionData , getFirestore, FirestoreModule} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { VideoService } from 'src/app/services/video.service';
import { newvideo } from 'src/app/models/newvideo';


@Component({
  selector: 'app-modificar-video',
  templateUrl: './modificar-video.component.html',
  styleUrls: ['./modificar-video.component.css']
})
export class ModificarVideoComponent {
  id: string | null | undefined;
  form:FormGroup;
  registros: string | undefined;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private firebase: Firestore,
    private crearvideo: VideoService){
      this.form = this.fb.group({
        titulo: ['', [Validators.required]],
        Descripcion: ['', [Validators.required]],
        SRC: ['', [Validators.required]],
      })

    }

     async ngOnInit(){
      this.id = this.aRouter.snapshot.paramMap.get('id');
      this.registros = this.crearvideo.getRegistro();
      const place2 = doc(this.firebase, 'video/' +this.registros);

      const snap2 = await getDoc(place2);
      if(snap2.exists()){//si existe buscamos el perfil
      const dato2 = snap2.data();    
      this.form.patchValue({
        id: dato2['id'],
        titulo: dato2['nombre'],
        Descripcion: dato2['Descripcion'],
        SRC: dato2['src'],  
      })
    }   
    }  
    async crear(){
      const place2 = doc(this.firebase, 'video/' +this.registros);
          const snap2 = await getDoc(place2);
          if(snap2.exists()){//si existe buscamos el perfil
          
          const dato2 = snap2.data();
      const newVideo: newvideo = {
        id: dato2['id'],
        nombre : this.form.value.titulo,
        Descripcion : this.form.value.Descripcion,
        src : this.form.value.SRC,
      }
      this.crearvideo.doc(newVideo);
      this.toastr.success('La actualizacion fue exitosa', 'Actualizacion completado');
      this.router.navigate(['tablaKinestesica/'+ this.id ]);
    }
    }
}

