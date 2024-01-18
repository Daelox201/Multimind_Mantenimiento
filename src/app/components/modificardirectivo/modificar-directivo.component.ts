
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from 'firebase/auth';
import { Firestore, doc, getDoc } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { dir } from 'src/app/models/dir';
import { est } from 'src/app/models/est';
import { mast } from 'src/app/models/mast';
import { AlumnoService } from 'src/app/services/alumno.service';
import { DirectivosService } from 'src/app/services/directivos.service';
import { MaestrosService } from 'src/app/services/maestros.service';
@Component({
  selector: 'app-modificar-directivo',
  templateUrl: './modificar-directivo.component.html',
  styleUrls: ['./modificar-directivo.component.css']
})
export class ModificarDirectivoComponent {
  id: string | null | undefined;
  form:FormGroup;
  loading = false;
  selectCarrera: string = '';
  registro: string | undefined;
  carreras: any[] = [
    {value: 'Ing. Software', nombre: 'Ing Software'},
    {value: 'Ing. Redes', nombre: 'Ing Redes'}
  ];
  constructor(private fb: FormBuilder,
     private toastr: ToastrService,
     private aRouter: ActivatedRoute,
     private router: Router,
     private firebase: Firestore,
     private _directivo: DirectivosService){


  this.form = this.fb.group({
    Nombre: ['',Validators.required],
    ApellidoPaterno: ['',Validators.required],
    ApellidoMaterno: ['',Validators.required],
    carrera: ['',Validators.required],
    cargo: ['',Validators.required],
    Username: ['',Validators.required],
    Matricula: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
  })

  }

  async ngOnInit(){
    this.id = this.aRouter.snapshot.paramMap.get('id');
    this.registro = this._directivo.getRegistro();

    const place2 = doc(this.firebase, 'directivo/' +this.registro);
    console.log(this.registro);
    const snap2 = await getDoc(place2);
    if(snap2.exists()){//si existe buscamos el perfil
    const dato2 = snap2.data();
      

    
    this.form.patchValue({
      Nombre: dato2['nombre'],
      ApellidoPaterno: dato2['apellidoPaterno'],
      ApellidoMaterno: dato2['apellidoMaterno'],
      Username: dato2['correo'],
      Matricula: dato2['matricula'],
      Carrera: dato2['carrera'],
      cargo: dato2['cargo'],
      
    })
    this.selectCarrera = dato2['carrera'];

    }


  }



     crear(){

  }


  }


