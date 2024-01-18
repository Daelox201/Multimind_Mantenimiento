import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, addDoc,getDoc, doc,setDoc,collection,collectionData , getFirestore, FirestoreModule, getDocs, deleteDoc} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { MaestrosService } from 'src/app/services/maestros.service';
import { mast } from 'src/app/models/mast';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-listadocente',
  templateUrl: './listadocente.component.html',
  styleUrls: ['./listadocente.component.css']
})
export class ListadocenteComponent {

  status: any[] = [
    {value: 'Ambos', nombre: 'Ambos'},
    {value: 'Activos', nombre: 'Activos'},
    {value: 'Inactivos', nombre: 'Inactivos'},
  ];
  
  tiempo: any[] = [
    {value: 'Todos', nombre: 'Todos'},
    {value: 'Tiempo Completo', nombre: 'Tiempo Completo'},
    {value: 'Medio Tiempo', nombre: 'Medio Tiempo'}
  ];
  
  carreras: any[] = [
    {value: 'Todos', nombre: 'Todos'},
    {value: 'Ing. Software', nombre: 'Ing Software'},
    {value: 'Ing. Redes', nombre: 'Ing Redes'}
  ];

  selectTiempo:string = 'Todos';
  selectCarrera :string = 'Todos';
  selectstatus :string = 'Ambos';


  listarDocentes: mast[] = [];
  nombreModal: string | undefined;
  ApellidoMModal: string | undefined;
  ApellidoPModal: string | undefined;
  TiempoModal: string | undefined;
  CarreraModal: string | undefined;
  PerfilModal: string | undefined;
  MatriculaModal: string | undefined;
  CorreoModal: string | undefined;

  
  id: string | null | undefined;
  
  forms:FormGroup;
  perfil = 'docente';
  
  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private _maestrosService: MaestrosService,
    private firebase: Firestore,
    ){
        this.forms = this.fb.group({
          Carrera: ['',Validators.required],
          tiempo: ['',Validators.required],
          status:['',Validators.required],
        })
  }
  
     ngOnInit(){
      this.id = this.aRouter.snapshot.paramMap.get('id');
    this.tabla();
 
  }
  refresh(): void {
    this.ngOnInit();
    }
  reset(){
    this.selectTiempo = 'Todos';
    this.selectCarrera = 'Todos';
    this.selectstatus = 'Ambos';
    this.ngOnInit();
   }

  async tabla(){
    this.listarDocentes = [];
    const colRef = collection(this.firebase, 'maestro');//buscamos la colección en la base de datos
    const querySnapshot = await getDocs(colRef);
    
    querySnapshot.forEach((doc: any) => {//iteramos sobre cada documento
    const data = doc.data();
  this.listarDocentes.push({
  
    id: doc.data['id'],
    ...doc.data()
  })
  
   //mostramos los datos del documento
    });
    this.listarDocentes.sort((a, b) => {
      if(this.selectCarrera == 'Ing. Software'){
   
      this.listarDocentes = this.listarDocentes.filter(docente => docente.carrera == 'Ing. Software' );
    } 
    if( this.selectTiempo !== 'Todos'){
      
      this.listarDocentes = this.listarDocentes.filter(docente =>  docente.tiempo == this.selectTiempo);
    } 
    if(this.selectstatus == 'Activos'){
      this.listarDocentes = this.listarDocentes.filter(docente =>docente.activo !== 'danger');
    }
    if(this.selectstatus == 'Inactivos'){
      this.listarDocentes = this.listarDocentes.filter(docente =>docente.activo !== 'success');
    
    }
    if(this.selectCarrera == 'Ing. Redes' ){
      this.listarDocentes = this.listarDocentes.filter(docente => docente.carrera == this.selectCarrera);
    } 
      return a.apellidoPaterno.localeCompare(b.apellidoPaterno);
      }); 
  }

  async eye(id: any){
    const place = doc(this.firebase, 'maestro/'+ id );
    const snap = await getDoc(place);
    if(snap.exists()){//si existe buscamos el perfil
      const dato = snap.data();
      this.nombreModal = dato['nombre'];
      this.ApellidoPModal = dato['apellidoPaterno'];
      this.ApellidoMModal = dato['apellidoMaterno'];
      this.TiempoModal = dato['tiempo'];
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
      '<td> Tiempo: '+this.TiempoModal+'</td><br><br>'+
      '<td> Perfil: '+this.PerfilModal+'</td><br><br>'+
      '</div>'


  })  
  }
  
  
    async eliminarAlumno(id: any){
      const docRef = doc(this.firebase, 'maestro', id); //obtiene la referencia del documento por su id
      await deleteDoc(docRef).then(() =>{
        this.listarDocentes = this.listarDocentes.filter(docente => docente.id !== id);
      }, error =>{
        this.toastr.error('El registro no se elimino', 'Error')
      }); //elimina el documento
       //elimina el registro de la lista
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
    async desactivar(id: any){
          
      const place2 = doc(this.firebase, 'maestro/'+ id );
      const snap2 = await getDoc(place2);
      if(snap2.exists()){//si existe buscamos el perfil
      const dato2 = snap2.data();
      
      const maestro: mast = {
        id: dato2['id'],
        nombre: dato2['nombre'],
        apellidoPaterno: dato2['apellidoPaterno'],
        apellidoMaterno: dato2['apellidoMaterno'],
        carrera: dato2['carrera'],
        tiempo: dato2['tiempo'],
        correo: dato2['correo'],
        matricula: dato2['matricula'],
        perfil: dato2['perfil'],
        psw: dato2['psw'],
        activo: 'danger',
      }
      
      this._maestrosService.doc(maestro).then(()=>{
         this.refresh();
      });
      }
    }

    async activar(id: any){
   
      const place2 = doc(this.firebase, 'maestro/'+ id );
      const snap2 = await getDoc(place2);
      if(snap2.exists()){//si existe buscamos el perfil
      const dato2 = snap2.data();
      
      const maestro: mast = {
        id: dato2['id'],
        nombre: dato2['nombre'],
        apellidoPaterno: dato2['apellidoPaterno'],
        apellidoMaterno: dato2['apellidoMaterno'],
        carrera: dato2['carrera'],
        tiempo: dato2['tiempo'],
        correo: dato2['correo'],
        matricula: dato2['matricula'],
        perfil: dato2['perfil'],
        psw: dato2['psw'],
        activo: 'success',
      }
      
      this._maestrosService.doc(maestro).then(()=>{
         this.refresh();
      });
      }
    }
  
   async Modificar(id:any ){
     this._maestrosService.setRegistro;
     const placeRef = doc(this.firebase, 'maestro', id);//buscamos la colección en la base de datos
     const docSnap = await getDoc(placeRef);
     if(docSnap.exists()){
     const data = docSnap.data();
     this._maestrosService.setRegistro(data['id']);
     this.router.navigate(['ModificarDocente/'+ this.id ]);
     }
  }
  
  crearDocente(){
    this.router.navigate(['CrearMaestro/'+ this.id ]);
  }
  
  
  }
