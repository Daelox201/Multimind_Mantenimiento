
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { est } from 'src/app/models/est';
import { AlumnoService } from 'src/app/services/alumno.service';


@Component({
  selector: 'app-loginest',
  templateUrl: './loginest.component.html',
  styleUrls: ['./loginest.component.css']
})
export class LoginestComponent {
  registro: string | undefined;
  form:FormGroup;
  msj: boolean = false;
  selectCarrera = '';
  selectTutor = '';
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

  id: string | null | undefined;

boton: boolean = true;
  constructor(private fb: FormBuilder,
     private _alumnoService: AlumnoService,
     private aRouter: ActivatedRoute,
     private router: Router,
     private toastr: ToastrService){

  this.form = this.fb.group({
    Nombre: ['', [Validators.required,Validators.maxLength(25), Validators.pattern(/^[a-zA-Z\s]*$/)]],
    ApellidoPaterno: ['', [Validators.required,Validators.maxLength(25), Validators.pattern(/^[a-zA-Z]+( [a-zA-Z]+)*$/)]],
    ApellidoMaterno: ['', [Validators.required, Validators.maxLength(25), Validators.pattern(/^[a-zA-Z]+( [a-zA-Z]+)*$/)]],
    Username: ['', [Validators.required,Validators.maxLength(35), Validators.email]],
    Matricula: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(10), Validators.maxLength(10)]] ,
    Carrera: ['',Validators.required],
    Tutor: ['',Validators.required],
  })

  }

  ngOnInit(): void{
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }



     crear(){

    const alumno: est = {
      nombre: this.form.value.Nombre,
      apellidoPaterno: this.form.value.ApellidoPaterno,
      apellidoMaterno: this.form.value.ApellidoMaterno,
      correo: this.form.value.Username,
      matricula: this.form.value.Matricula,
      carrera: this.form.value.Carrera,
      tutor: this.form.value.Tutor,
      psw: 'upp1234',
      perfil: 'estudiante',
      test: 'success',
      activo: 'success',
      IL: 0,
      ILM:  0,
      IVE:  0,
      IKC:  0,
      IM: 0,
      IITRA:  0,
      IINTER: 0,
      intentos: 0
    }
  
    this._alumnoService.crearAlumno(alumno).then(()=>{
    
      alumno.id = this._alumnoService.getId(alumno)?.uid;
     // this._alumnoService.datosAlumno(alumno);
     this._alumnoService.doc(alumno);
     this.msj = false;
     this.router.navigate(['lista/'+ this.id +'']);
     this.toastr.success('El registro fue exitoso', 'Registro completado');
    }, error =>{
      
      if (this.msj === false){
      this.toastr.error('Oppps.... ocurrio un error', 'Error')
      }
        })
  }


  }
