import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, addDoc,getDoc, doc,setDoc,collection,collectionData , getFirestore, FirestoreModule, getDocs, deleteDoc} from '@angular/fire/firestore';
import { MaestrosService } from 'src/app/services/maestros.service';
import { mast } from 'src/app/models/mast';

@Component({
  selector: 'app-modificarmaestro',
  templateUrl: './modificarmaestro.component.html',
  styleUrls: ['./modificarmaestro.component.css']
})
export class ModificarmaestroComponent {
  registro: string | undefined;
  form:FormGroup;
  loading = false;
  correo:string = '';
  id: string | null | undefined;
  selectTiempo: string = '';
  

  tiempo: any[] = [
    {value: 'Tiempo Completo', nombre: 'Tiempo Completo'},
    {value: 'Medio Tiempo', nombre: 'Medio Tiempo'}
  ];
  selectCarrera:string = '';

  carreras: any[] = [
    {value: 'Ing. Software', nombre: 'Ing Software'},
    {value: 'Ing. Redes', nombre: 'Ing Redes'}
  ];


  constructor(private fb: FormBuilder,
     private aRouter: ActivatedRoute,
     private firebase: Firestore,
     private router: Router,
     private _maestrosService: MaestrosService){


  this.form = this.fb.group({

    tiempo: ['',Validators.required],
    Nombre: ['', [Validators.required, Validators.maxLength(25), Validators.pattern(/^[a-zA-Z\s]*$/)]],
    ApellidoPaterno: ['', [Validators.required, Validators.maxLength(25), Validators.pattern(/^[a-zA-Z\s]*$/)]],
    ApellidoMaterno: ['', [Validators.required, Validators.maxLength(25), Validators.pattern(/^[a-zA-Z\s]*$/)]],
    carrera: ['',Validators.required],
    Matricula: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(10), Validators.maxLength(10)]] ,

  })

  }

  async ngOnInit(){

    this.id = this.aRouter.snapshot.paramMap.get('id');
    this.registro = this._maestrosService.getRegistro();
    const place2 = doc(this.firebase, 'maestro/' +this.registro);
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
      tiempo: dato2['tiempo'],
      
    })
    this.correo = dato2['correo'];
    this.selectCarrera = dato2['carrera'];
    this.selectTiempo = dato2['tiempo'];
    }

  }
Modificar(){
  this.crear();
  this.router.navigate(['listaDocente/'+ this.id +'']);
}

     async crear(){

      const place2 = doc(this.firebase, 'maestro/' +this.registro);
      console.log(this.registro);
      const snap2 = await getDoc(place2);
      if(snap2.exists()){//si existe buscamos el perfil
      const dato2 = snap2.data();
    
    const maestro: mast = {
      id: dato2['id'],
      nombre: this.form.value.Nombre,
      apellidoPaterno: this.form.value.ApellidoPaterno,
      apellidoMaterno: this.form.value.ApellidoMaterno,
      carrera: this.form.value.carrera,
      tiempo: this.form.value.tiempo,
      correo: dato2['correo'],
      matricula: this.form.value.Matricula,
      perfil: dato2['perfil'],
      psw: dato2['psw'],
      activo: dato2['activo'],
    }

    this._maestrosService.doc(maestro);

      }
  }


  }

