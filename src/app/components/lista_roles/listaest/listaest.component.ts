import { Component } from '@angular/core';
import { AlumnoService } from 'src/app/services/alumno.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, addDoc,getDoc, doc,setDoc,collection,collectionData , getFirestore, FirestoreModule, getDocs, deleteDoc} from '@angular/fire/firestore';
import { est } from 'src/app/models/est';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-listaest',
  templateUrl: './listaest.component.html',
  styleUrls: ['./listaest.component.css'],
})
export class ListaestComponent {
  idModificar: string | undefined;

listarAlumnos: est[] = [];


nombreModal: string | undefined;
ApellidoMModal: string | undefined;
ApellidoPModal: string | undefined;
TutorModal: string | undefined;
CarreraModal: string | undefined;
PerfilModal: string | undefined;
MatriculaModal: string | undefined;
CorreoModal: string | undefined;

status: any[] = [
  {value: 'Ambos', nombre: 'Ambos'},
  {value: 'Activos', nombre: 'Activos'},
  {value: 'Inactivos', nombre: 'Inactivos'},
];

  tutor: any[] = [
    {value: 'Todos', nombre: 'Todos'},
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

carreras: any[] = [
  {value: 'Todos', nombre: 'Todos'},
  {value: 'Ing. Software', nombre: 'Ing Software'},
  {value: 'Ing. Redes', nombre: 'Ing Redes'}
];
selectTutor:string = 'Todos';
selectCarrera :string = 'Todos';
selectstatus :string = 'Ambos';

filtro: string = "";
id: string | null | undefined;

forms:FormGroup;
loading = false;
perfil = 'docente';
test: string ='danger';

constructor(private fb: FormBuilder,
  private router: Router,
  private aRouter: ActivatedRoute,
  private firebase: Firestore,
  private AlumnoService: AlumnoService
  ){

    this.forms = this.fb.group({
      Carrera: ['',Validators.required],
      Tutor: ['',Validators.required],
      status:['',Validators.required],
    })
}
    ngOnInit(): void{
    this.id = this.aRouter.snapshot.paramMap.get('id');
    this.tabla();
    }
    refresh(): void {
    this.ngOnInit();
    }

   reset(){
    this.selectTutor = 'Todos';
    this.selectCarrera = 'Todos';
    this.selectstatus = 'Ambos';
    this.ngOnInit();
    }
  async tabla(){
    this.listarAlumnos = [];
    const colRef = collection(this.firebase, 'alumno');//buscamos la colección en la base de datos
    const querySnapshot = await getDocs(colRef);
    querySnapshot.forEach((doc: any) => {//iteramos sobre cada documento
    const data = doc.data();
    this.listarAlumnos.push({
    id: doc.data['id'],
    ...doc.data()
  })
  
   //mostramos los datos del documento
    });
    this.listarAlumnos.sort((a, b) => {
      if(this.selectCarrera == 'Ing. Software'){
      this.listarAlumnos = this.listarAlumnos.filter(alumno => alumno.carrera == 'Ing. Software');
    } 
    if( this.selectTutor !== 'Todos'){
      this.listarAlumnos = this.listarAlumnos.filter(alumno =>  alumno.tutor == this.selectTutor);
    } 
    if(this.selectstatus == 'Activos'){
      this.listarAlumnos = this.listarAlumnos.filter(alumno =>alumno.activo !== 'danger');
    }
    if(this.selectstatus == 'Inactivos'){
      this.listarAlumnos = this.listarAlumnos.filter(alumno =>alumno.activo !== 'success');
    }
    if(this.selectCarrera == 'Ing. Redes' ){
      this.listarAlumnos = this.listarAlumnos.filter(alumno => alumno.carrera == this.selectCarrera);
    } 
      return a.apellidoPaterno.localeCompare(b.apellidoPaterno) ;
      })
    }

  
  async activar(id: any){
          
    const place2 = doc(this.firebase, 'alumno/'+ id );
    const snap2 = await getDoc(place2);
    if(snap2.exists()){//si existe buscamos el perfil
    const dato2 = snap2.data();
    
    const alumno: est = {
      id: dato2['id'],
      nombre: dato2['nombre'],
      apellidoPaterno: dato2['apellidoPaterno'],
      apellidoMaterno: dato2['apellidoMaterno'],
      correo: dato2['correo'],
      matricula: dato2['matricula'],
      carrera: dato2['carrera'],
      tutor:  dato2['tutor'],      
      psw: dato2['psw'],
      perfil: 'estudiante',
      test: 'danger',
      activo: 'success',
      IL: dato2['IL'],
      ILM:  dato2['ILM'],
      IVE:  dato2['IVE'],
      IKC:  dato2['IKC'],
      IM: dato2['IM'],
      IITRA:  dato2['IITRA'],
      IINTER: dato2['IINTER'],
      intentos: dato2['intentos'],
    }
    this.AlumnoService.doc(alumno).then(()=>{
       this.refresh();
    });
    }
  }


  async desactivar(id: any){
          
    const place2 = doc(this.firebase, 'alumno/'+ id );
    const snap2 = await getDoc(place2);
    if(snap2.exists()){//si existe buscamos el perfil
    const dato2 = snap2.data();
    
    const alumno: est = {
      id: dato2['id'],
      nombre: dato2['nombre'],
      apellidoPaterno: dato2['apellidoPaterno'],
      apellidoMaterno: dato2['apellidoMaterno'],
      correo: dato2['correo'],
      matricula: dato2['matricula'],
      carrera: dato2['carrera'],
      tutor:  dato2['tutor'],      
      psw: dato2['psw'],
      perfil: 'estudiante',
      test: 'danger',
      activo: 'danger',
      IL: dato2['IL'],
      ILM:  dato2['ILM'],
      IVE:  dato2['IVE'],
      IKC:  dato2['IKC'],
      IM: dato2['IM'],
      IITRA:  dato2['IITRA'],
      IINTER: dato2['IINTER'],
      intentos: dato2['intentos'],
    }
    this.AlumnoService.doc(alumno).then(()=>{
      this.refresh();
    });
          
    }
    
    
  }
  modalDesactivado(id:any){
    Swal.fire({
      title: '¿Quiere deshabilitar la cuenta?',
      text: "Este es el apartado donde le quitara el permiso al estudiante de acceder a la plataforma ",
      icon: 'warning',
      iconColor: 'red',
      showCancelButton: true,
      confirmButtonText: 'Deshabilitar', 
      confirmButtonColor: 'red',
      denyButtonText: `Deshabilitar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.desactivar(id);
      }
    })
  }
  modalActivado(id:any){
    Swal.fire({
      title: '¿Quiere habilitar la cuenta?',
      text: "Este es el apartado donde otorgara el permiso al estudiante de acceder a la plataforma ",
      icon: 'warning',
      iconColor: 'red',
      showCancelButton: true,
      confirmButtonText: 'Habilitar', 
      confirmButtonColor: '#008f39 ',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.activar(id);
      }if (result.isDenied) {
       this.desactivar(id);
      }
    })
  }
   modalExamenActivado(id:any){
    Swal.fire({
      title: '¿Quiere habilitar el test?',
      text: "Este es el apartado donde otorgara el permiso al estudiante de realizar el test ",
      icon: 'warning',
      iconColor: 'red',
      showCancelButton: true,
      confirmButtonText: 'Habilitar', 
      confirmButtonColor: '#008f39 ',

    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.habilitar(id);
      
      }  
    })
  }
  modalExamenDesactivado(id:any){
    Swal.fire({
      title: '¿Quiere deshabilitar el test?',
      text: "Este es el apartado donde quitara el permiso al estudiante de realizar el test ",
      icon: 'warning',
      iconColor: 'red',
      showCancelButton: true,
      confirmButtonText: 'Deshabilitar', 
      confirmButtonColor: 'red ',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.desa(id);
      }  
    })
  }

    async desa(id: any){      
    const place2 = doc(this.firebase, 'alumno/'+ id );
    const snap2 = await getDoc(place2);
    if(snap2.exists()){//si existe buscamos el perfil
    const dato2 = snap2.data();  
    const alumno: est = {
      id: dato2['id'],
      nombre: dato2['nombre'],
      apellidoPaterno: dato2['apellidoPaterno'],
      apellidoMaterno: dato2['apellidoMaterno'],
      correo: dato2['correo'],
      matricula: dato2['matricula'],
      carrera: dato2['carrera'],
      tutor:  dato2['tutor'],      
      psw: 'upp1234',
      perfil: 'estudiante',
      test: 'danger',
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
    this.AlumnoService.doc(alumno).then(()=>{
      this.refresh();
    });         
    }  
    }


  async habilitar(id: any){
    const place2 = doc(this.firebase, 'alumno/'+ id );
    const snap2 = await getDoc(place2);
    if(snap2.exists()){//si existe buscamos el perfil
    const dato2 = snap2.data();  
    const alumno: est = {
      id: dato2['id'],
      nombre: dato2['nombre'],
      apellidoPaterno: dato2['apellidoPaterno'],
      apellidoMaterno: dato2['apellidoMaterno'],
      correo: dato2['correo'],
      matricula: dato2['matricula'],
      carrera: dato2['carrera'],
      tutor:  dato2['tutor'],      
      psw: 'upp1234',
      perfil: 'estudiante',
      test: 'success',
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
    
    this.AlumnoService.doc(alumno).then(()=>{
      this.refresh();
    });
    }
  }

  async Modificar(id: any){
    const placeRef = doc(this.firebase, 'alumno', id);//buscamos la colección en la base de datos
    const docSnap = await getDoc(placeRef);
    if(docSnap.exists()){
    const data = docSnap.data();
    this.AlumnoService.setRegistro(data['id']);
    this.router.navigate(['ModificarAlumno/'+ this.id ]);
    }
}
redirigirFormulario(id: any) { // Cambia 'any' por el tipo de dato de tu registro
  this.AlumnoService.setRegistro(id);
}

crearEstudiante(){
  this.router.navigate(['loginest/'+ this.id ]);
}
async eye(id: any){
  const place = doc(this.firebase, 'alumno/'+ id );
  const snap = await getDoc(place);
  if(snap.exists()){//si existe buscamos el perfil
    const dato = snap.data();
    this.nombreModal = dato['nombre'];
    this.ApellidoPModal = dato['apellidoPaterno'];
    this.ApellidoMModal = dato['apellidoMaterno'];
    this.TutorModal = dato['tutor'];
    this.PerfilModal = dato['perfil'];
    this.CarreraModal = dato['carrera'];
    this.MatriculaModal = dato['matricula'];
    this.CorreoModal = dato['correo'];
  
  } 
  Swal.fire({
    title:'Informacion de Usuario',
    html:
    '<div class=""><br><br>'+
    '<td> Nombre: '+this.nombreModal+'</td><br><br>'+
    '<td> Apellido Paterno: '+this.ApellidoPModal+'</td><br><br>'+
    '<td> Apellido Materno: '+this.ApellidoMModal+'</td><br><br>'+
    '<td> Matricula: '+this.MatriculaModal+'</td><br><br>'+
    '<td> Correo: '+this.CorreoModal+'</td><br><br>'+
    '<td> Carrera: '+this.CarreraModal+'</td><br><br>'+
    '<td> Tiempo: '+this.TutorModal+'</td><br><br>'+
    '<td> Perfil: '+this.PerfilModal+'</td><br><br>'+
    '</div>'


}) 
}
}