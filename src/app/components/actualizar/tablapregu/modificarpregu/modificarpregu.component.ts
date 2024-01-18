import {  Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, addDoc,getDoc, doc,setDoc,collection,collectionData , getFirestore, FirestoreModule} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { interpersonal } from 'src/app/models/interpersonal';
import { InterpreguntaService } from 'src/app/services/interpregunta.service';

@Component({
  selector: 'app-modificarpregu',
  templateUrl: './modificarpregu.component.html',
  styleUrls: ['./modificarpregu.component.css']
})

export class ModificarpreguComponent {
  
  id: string | null | undefined;
  form:FormGroup;
  registros: string | undefined;
  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private firebase: Firestore,
    private pregu: InterpreguntaService){
      this.form = this.fb.group({
        preg: ['', [Validators.required]],
        correcta: ['', [Validators.required]],
        mala1: ['', [Validators.required]],
        mala2: ['', [Validators.required]],
        mala3: ['', [Validators.required]],

      })}

     async ngOnInit(){
      this.id = this.aRouter.snapshot.paramMap.get('id');
      this.registros = this.pregu.getRegistro();
      const place2 = doc(this.firebase, 'Pregunta_Interpersonal/' +this.registros);

      const snap2 = await getDoc(place2);
      if(snap2.exists()){//si existe buscamos el perfil
      const dato2 = snap2.data();    
      this.form.patchValue({
        id: dato2['id'],
        preg: dato2['pregunta'],
        correcta: dato2['buena'],
        mala1: dato2['mala1'],
        mala2: dato2['mala2'],
        mala3: dato2['mala3'],
        
      })
    }  

  }
  
  async crear(){

    const place2 = doc(this.firebase, 'Pregunta_Interpersonal/' +this.registros);
        const snap2 = await getDoc(place2);
        console.log(this.registros);
        if(snap2.exists()){//si existe buscamos el perfil
        
        const dato2 = snap2.data();
        console.log(dato2['pregunta'])
    const newPregunta: interpersonal = {
      id: dato2['id'],
      pregunta : this.form.value.preg,
      buena : this.form.value.correcta,
      mala1 : this.form.value.mala1,
      mala2 : this.form.value.mala2,
      mala3 : this.form.value.mala3 
  
    }
    this.pregu.doc(newPregunta);
    this.toastr.success('La actualizacion fue exitosa', 'Actualizacion completado');
    this.router.navigate(['tablaPreguntas/'+ this.id ]);
  }
  }
  
}
