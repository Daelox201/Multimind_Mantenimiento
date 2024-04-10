import {  Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, addDoc,getDoc, doc,setDoc,collection,collectionData , getFirestore, FirestoreModule} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { newpalabra } from 'src/app/models/newpalabra';
import { PalabraService } from 'src/app/services/palabra.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-palabras',
  templateUrl: './actualizar-palabras.component.html',
  styleUrls: ['./actualizar-palabras.component.css']
})
export class ActualizarPalabrasComponent {
  id: string | null | undefined;
  form:FormGroup;
  registros: string | undefined;
  word1: string | undefined;
  word2: string | undefined;
  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private firebase: Firestore,
    private palabra: PalabraService){
      this.form = this.fb.group({
        palabra: ['', [Validators.required]],
        palabra2: ['', [Validators.required]],
      })
    }
     async ngOnInit(){
      this.id = this.aRouter.snapshot.paramMap.get('id');
      this.registros = this.palabra.getRegistro();
      const place2 = doc(this.firebase, 'palabra/' +this.registros);
      const snap2 = await getDoc(place2);
      if(snap2.exists()){//si existe buscamos el perfil
      const dato2 = snap2.data();    
      this.form.patchValue({
        id: dato2['id'],
        palabra: dato2['palabra'], 
        palabra2: dato2['palabra'], 
      })
    }   
    }  
  async crear(){
  this.word1 = this.form.value.palabra;
  this.word2 = this.form.value.palabra2;
if(this.word1 === this.word2){
  const place2 = doc(this.firebase, 'palabra/' +this.registros);
  const snap2 = await getDoc(place2);
  if(snap2.exists()){//si existe buscamos el perfil
  
  const dato2 = snap2.data();
const newPalabra: newpalabra = {
id: dato2['id'],
palabra : this.form.value.palabra,

}
this.palabra.doc(newPalabra);
this.toastr.success('La actualizacion fue exitosa', 'Actualizacion completado');
this.router.navigate(['tablaPalabra/'+ this.id ]);
}
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

