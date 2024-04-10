import {  Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, addDoc,getDoc, doc,setDoc,collection,collectionData , getFirestore, FirestoreModule} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { AdivinanzaService } from 'src/app/services/adivinanza.service';
import { newadivinanza } from 'src/app/models/newadivinanza';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-modificar-adivinanza',
  templateUrl: './modificar-adivinanza.component.html',
  styleUrls: ['./modificar-adivinanza.component.css']
})
export class ModificarAdivinanzaComponent {
  id: string | null | undefined;
  form:FormGroup;
  registros: string | undefined;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private firebase: Firestore,
    private adi: AdivinanzaService){
      this.form = this.fb.group({
        adivinanza: ['', [Validators.required]],
        pista: ['', [Validators.required]],
        respuesta: ['', [Validators.required]],
        respuesta2: ['', [Validators.required]],
      })

    }
    async ngOnInit(){
      this.id = this.aRouter.snapshot.paramMap.get('id');
      this.registros = this.adi.getRegistro();
      const place2 = doc(this.firebase, 'adivinanza/' +this.registros);

      const snap2 = await getDoc(place2);
      if(snap2.exists()){//si existe buscamos el perfil
      const dato2 = snap2.data();    
      this.form.patchValue({
        id: dato2['id'],
        adivinanza: dato2['adivinanza'],
        pista: dato2['pista'],
        respuesta: dato2['palabra'],
        respuesta2: dato2['palabra'],
      })
    }   
    } 
    async crear(){
      if(this.form.value.respuesta === this.form.value.respuesta2){
      const place2 = doc(this.firebase, 'adivinanza/' +this.registros);
      const snap2 = await getDoc(place2);
      if(snap2.exists()){//si existe buscamos el perfil
      
      const dato2 = snap2.data();
    const adivi: newadivinanza = {
    id: dato2['id'],
     adivinanza: this.form.value.adivinanza,
     pista: this.form.value.pista,
     palabra: this.form.value.respuesta,
  }
  this.adi.doc(adivi);
  this.toastr.success('La actualizacion fue exitosa', 'Actualizacion completado');
  this.router.navigate(['tablaAdivinanza/'+ this.id ]);
}
}
else{
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
