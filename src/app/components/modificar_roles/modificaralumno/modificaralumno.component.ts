import { Component } from '@angular/core';
import { AlumnoService } from 'src/app/services/alumno.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, addDoc,getDoc, doc,setDoc,collection,collectionData , getFirestore, FirestoreModule, getDocs, deleteDoc} from '@angular/fire/firestore';
import { est } from 'src/app/models/est';


@Component({
  selector: 'app-modificaralumno',
  templateUrl: './modificaralumno.component.html',
  styleUrls: ['./modificaralumno.component.css']
})
export class ModificaralumnoComponent {
  registro: string | undefined;
  form:FormGroup;
  selectCarrera: string = '';
  selectTutor: string = '';
  carreras: any[] = [
    {value: 'Ing. Software', nombre: 'Ing Software'},
    {value: 'Ing. Redes', nombre: 'Ing Redes'}
  ];

  tutor: any[] = [
    {value: 'Carlos Roberto Dominguez Mayorga', nombre: 'Carlos Roberto Dominguez Mayorga'},
    {value: 'Marisol Ramirez Tellez', nombre: 'Marisol Ramirez Tellez'},
    {value: 'Erika Verenice Ceron Cornejo', nombre: 'Erika Verenice Ceron Cornejo'},
    {value: 'Jazmin Rodriguez Flores', nombre: 'Jazmin Rodriguez Flores'},
    {value: 'Jaime Aguilar Ortiz', nombre: 'Jaime Aguilar Ortiz'},
    {value: 'Mayra Fabiola Gonzalez Peralta', nombre: 'Mayra Fabiola Gonzalez Peralta'},
    {value: 'Ocotlan Diaz Parra', nombre: 'Ocotlan Diaz Parra'},
    {value: 'Diana Xochil Ruani Vargas', nombre: 'Diana Xochil Ruani Vargas'},
    {value: 'Maria Eugenia Garcia Bautista', nombre: 'Maria Eugenia Garcia Bautista'},
    {value: 'Alicia Ortiz Montes', nombre: 'Alicia Ortiz Montes'},
    {value: 'Felix Alberto Hernandez Rodriguez', nombre: 'Felix Alberto Hernandez Rodriguez'},//software
    //redes
    {value: 'Jose Juan Zarate Corona', nombre: 'Jose Juan Zarate Corona'},
    {value: 'Karina Galvan Cervantes', nombre: 'Karina Galvan Cervantes'},
    {value: 'Eric Simancas Acevedo', nombre: 'Eric Simancas Acevedo'},  ];
    correo:string = '';
  id: string | null | undefined;
  msj: boolean = false;
boton: boolean = true;
  constructor(private fb: FormBuilder,
    private router: Router,
    private aRouter: ActivatedRoute,
    private firebase: Firestore,
    private AlumnoService: AlumnoService){

  this.form = this.fb.group({
    Nombre: ['', [Validators.required,Validators.maxLength(25), Validators.pattern(/^[a-zA-Z\s]*$/)]],
    ApellidoPaterno: ['', [Validators.required,Validators.maxLength(25), Validators.pattern(/^[a-zA-Z\s]*$/)]],
    ApellidoMaterno: ['', [Validators.required,Validators.maxLength(25), Validators.pattern(/^[a-zA-Z\s]*$/)]],
    // Username: ['', [Validators.required, Validators.email]],
    Matricula: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(10), Validators.maxLength(10)]] ,
    Carrera: ['',Validators.required],
    Tutor: ['',Validators.required],
  })

  }

  async ngOnInit(): Promise<void>{
    this.id = this.aRouter.snapshot.paramMap.get('id');
    this.registro = this.AlumnoService.getRegistro();
    const place2 = doc(this.firebase, 'alumno/'+ this.registro );
    const snap2 = await getDoc(place2);
    if(snap2.exists()){//si existe buscamos el perfil
    const dato2 = snap2.data();
    this.form.patchValue({
      Nombre: dato2['nombre'],
      ApellidoPaterno: dato2['apellidoPaterno'],
      ApellidoMaterno: dato2['apellidoMaterno'],
      Matricula: dato2['matricula'],
      Carrera: dato2['carrera'],   
    })
    this.correo = dato2['correo'];
    this.selectCarrera = dato2['carrera'];
    this.selectTutor = dato2['tutor'];
  }
  }

  async Modificar(){
      const place2 = doc(this.firebase, 'alumno/' +this.registro);
      const snap2 = await getDoc(place2);
      if(snap2.exists()){//si existe buscamos el perfil
      const dato2 = snap2.data();
      const alumno: est = {
        id: dato2['id'],
        nombre: this.form.value.Nombre,
        apellidoPaterno: this.form.value.ApellidoPaterno,
        apellidoMaterno: this.form.value.ApellidoMaterno,
        correo: dato2['correo'],
        matricula: this.form.value.Matricula,
        carrera: this.form.value.Carrera,
        tutor:  this.form.value.Tutor,
        psw: dato2['psw'],
        perfil: dato2['perfil'],
        test: dato2['test'],
        activo: dato2['activo'],
        IL: dato2['IL'],
        ILM:  dato2['ILM'],
        IVE:  dato2['IVE'],
        IKC:  dato2['IKC'],
        IM: dato2['IM'],
        IITRA:  dato2['IITRA'],
        IINTER: dato2['IINTER'],
        intentos: dato2['intentos'],
      }
      this.AlumnoService.doc(alumno);
      this.router.navigate(['lista/'+ this.id +'']);
       }
  }
}


