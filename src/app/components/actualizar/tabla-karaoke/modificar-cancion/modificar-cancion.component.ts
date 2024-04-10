import {  Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, addDoc,getDoc, doc,setDoc,collection,collectionData , getFirestore, FirestoreModule} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { CancionService } from 'src/app/services/cancion.service';
import { newcancion } from 'src/app/models/newcancion';

@Component({
  selector: 'app-modificar-cancion',
  templateUrl: './modificar-cancion.component.html',
  styleUrls: ['./modificar-cancion.component.css']
})
export class ModificarCancionComponent {
  id: string | null | undefined;
  form:FormGroup;
  registros: string | undefined;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private firebase: Firestore,
    private crearcancion: CancionService){
      this.form = this.fb.group({
        titulo: ['', [Validators.required]],
        Descripcion: ['', [Validators.required]],
        SRC: ['', [Validators.required]],
      })

    }

     async ngOnInit(){
      this.id = this.aRouter.snapshot.paramMap.get('id');
      this.registros = this.crearcancion.getRegistro();
      const place2 = doc(this.firebase, 'cancion/' +this.registros);

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
      const place2 = doc(this.firebase, 'cancion/' +this.registros);
          const snap2 = await getDoc(place2);
          if(snap2.exists()){//si existe buscamos el perfil
          
          const dato2 = snap2.data();
      const cancion: newcancion = {
        id: dato2['id'],
        nombre : this.form.value.titulo,
        Descripcion : this.form.value.Descripcion,
        src : this.form.value.SRC,
      }
      this.crearcancion.doc(cancion);
      this.toastr.success('La actualizacion fue exitosa', 'Actualizacion completado');
      this.router.navigate(['tablaKaraoke/'+ this.id ]);
    }
    }
}

