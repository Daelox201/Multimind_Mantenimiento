import {  Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, addDoc,getDoc, doc,setDoc,collection,collectionData , getFirestore, FirestoreModule} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { newlectura } from 'src/app/models/newlectura';
import { LecturaService } from 'src/app/services/lectura.service';
@Component({
  selector: 'app-modificarlectura',
  templateUrl: './modificarlectura.component.html',
  styleUrls: ['./modificarlectura.component.css']
})
export class ModificarlecturaComponent {
  id: string | null | undefined;
  form:FormGroup;
  registros: string | undefined;
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
    private firebase: Firestore,
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

     async ngOnInit(){
      this.id = this.aRouter.snapshot.paramMap.get('id');
      this.registros = this.newlectura.getRegistro();
      const place2 = doc(this.firebase, 'lectura/' +this.registros);
      const snap2 = await getDoc(place2);
      if(snap2.exists()){//si existe buscamos el perfil
      const dato2 = snap2.data();

      this.form.patchValue({
        titulo: dato2['titulo'],
        lectura: dato2['lectura'],
        preg1: dato2['preg1'],
        preg2: dato2['preg2'],
        preg3: dato2['preg3'],
        preg4: dato2['preg4'],
        preg5: dato2['preg5'], 
      })
      this.R1= dato2['resp1'];
      this.R2= dato2['resp2'];
      this.R3= dato2['resp3'];
      this.R4= dato2['resp4'];
      this.R5= dato2['resp5'];
      }
    }  
  async crear(){

  const place2 = doc(this.firebase, 'lectura/' +this.registros);
  const snap2 = await getDoc(place2);
  if(snap2.exists()){//si existe buscamos el perfil
  const dato2 = snap2.data();
  const lectura: newlectura = {
     id: dato2['id'],
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
      this.newlectura.doc(lectura);
  this.toastr.success('La actualizacion fue exitosa', 'Actualizacion completado');
  this.router.navigate(['listaLecturas/'+ this.id ]);
}
}

}
