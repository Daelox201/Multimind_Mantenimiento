import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, addDoc,getDoc, doc,setDoc,collection,collectionData , getFirestore, FirestoreModule, getDocs, deleteDoc} from '@angular/fire/firestore';
import { DirectivosService } from 'src/app/services/directivos.service';
import { dir } from 'src/app/models/dir';

@Component({
  selector: 'app-modificardirectivo',
  templateUrl: './modificardirectivo.component.html',
  styleUrls: ['./modificardirectivo.component.css']
})
export class ModificardirectivoComponent  {
  id: string | null | undefined;
  form:FormGroup;
  correo:string = '';
  loading = false;
  selectCarrera: string = '';
  registro: string | undefined;
  carreras: any[] = [
    {value: 'Ing. Software', nombre: 'Ing Software'},
    {value: 'Ing. Redes', nombre: 'Ing Redes'}
  ];
  constructor(private fb: FormBuilder,
     private aRouter: ActivatedRoute,
     private router: Router,
     private firebase: Firestore,
     private DirectivoService: DirectivosService){
     this.form = this.fb.group({
    Nombre: ['', [Validators.required,Validators.maxLength(25), Validators.pattern(/^[a-zA-Z\s]*$/)]],
    ApellidoPaterno: ['', [Validators.required,Validators.maxLength(25), Validators.pattern(/^[a-zA-Z\s]*$/)]],
    ApellidoMaterno: ['', [Validators.required,Validators.maxLength(25), Validators.pattern(/^[a-zA-Z\s]*$/)]],
    carrera: ['',Validators.required],
    cargo: ['',[Validators.required,Validators.maxLength(30), Validators.pattern(/^[a-zA-Z\s]*$/)]],
    // Username: ['', [Validators.required, Validators.email]],
    Matricula: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(10), Validators.maxLength(10)]] ,


  })

}
   async ngOnInit(){
    this.id = this.aRouter.snapshot.paramMap.get('id');
    this.registro = this.DirectivoService.getRegistro();
    const place2 = doc(this.firebase, 'directivo/' +this.registro);
    console.log(this.registro);
    const snap2 = await getDoc(place2);
    if(snap2.exists()){//si existe buscamos el perfil
    const dato2 = snap2.data();
    this.form.patchValue({
      Nombre: dato2['nombre'],
      ApellidoPaterno: dato2['apellidoPaterno'],
      ApellidoMaterno: dato2['apellidoMaterno'],
      Matricula: dato2['matricula'],
      Carrera: dato2['carrera'],
      cargo: dato2['cargo'],
    })
    this.correo = dato2['correo'];
    this.selectCarrera = dato2['carrera'];
    }
  }
  Modificar(){
    this.crear();
    this.router.navigate(['listaDirectivo/'+ this.id +'']);
  }
     async crear(){
      const place2 = doc(this.firebase, 'directivo/' +this.registro);
      console.log(this.registro);
      const snap2 = await getDoc(place2);
      if(snap2.exists()){//si existe buscamos el perfil
      const dato2 = snap2.data();
      const directivo: dir = {
        id: dato2['id'],
        nombre: this.form.value.Nombre,
        apellidoPaterno: this.form.value.ApellidoPaterno,
        apellidoMaterno: this.form.value.ApellidoMaterno,
        carrera: this.form.value.carrera,
        cargo: this.form.value.cargo,
        correo: dato2['correo'],
        matricula: this.form.value.Matricula,
        psw: dato2['psw'],
        perfil: dato2['perfil'],
        activo: dato2['activo'],
      }
      this.DirectivoService.doc(directivo);
      this.router.navigate(['listaDirectivo/'+ this.id +'']);
    }
  }
  }




