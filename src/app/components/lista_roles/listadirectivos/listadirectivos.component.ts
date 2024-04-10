import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, addDoc,getDoc, doc,setDoc,collection,collectionData , getFirestore, FirestoreModule, getDocs, deleteDoc} from '@angular/fire/firestore';
import { dir } from 'src/app/models/dir';
import Swal from 'sweetalert2';
import { DirectivosService } from 'src/app/services/directivos.service';
@Component({
  selector: 'app-listadirectivos',
  templateUrl: './listadirectivos.component.html',
  styleUrls: ['./listadirectivos.component.css']
})
export class ListadirectivosComponent {

  status: any[] = [
    {value: 'Ambos', nombre: 'Ambos'},
    {value: 'Activos', nombre: 'Activos'},
    {value: 'Inactivos', nombre: 'Inactivos'}
  ];
  
  carreras: any[] = [
    {value: 'Todos', nombre: 'Todos'},
    {value: 'Ing. Software', nombre: 'Ing Software'},
    {value: 'Ing. Redes', nombre: 'Ing Redes'}
  ];


  selectCarrera :string = 'Todos';
  selectstatus :string = 'Ambos';

  listarDirectivos: dir[] = [];
  id: string | null | undefined;
  forms:FormGroup;

  nombreModal: string | undefined;
  ApellidoMModal: string | undefined;
  ApellidoPModal: string | undefined;
  CargoModal: string | undefined;
  CarreraModal: string | undefined;
  PerfilModal: string | undefined;
  MatriculaModal: string | undefined;
  CorreoModal: string | undefined;

  constructor(private fb: FormBuilder,
    private router: Router,
    private aRouter: ActivatedRoute,
    private firebase: Firestore,
    private _directivo: DirectivosService,
    ){
      this.forms = this.fb.group({
        Carrera: ['',Validators.required],
        status:['',Validators.required],
      })
  }
  
     ngOnInit(){
      this.id = this.aRouter.snapshot.paramMap.get('id');
      this.tabla();
}
reset(){
  // this.selectTiempo = 'Todos';
  this.selectCarrera = 'Todos';
  this.selectstatus = 'Ambos';
  this.ngOnInit();
  }
  async tabla(){
    this.listarDirectivos = [];
  const colRef = collection(this.firebase, 'directivo');//buscamos la colección en la base de datos
  const querySnapshot = await getDocs(colRef);
  
  querySnapshot.forEach((doc: any) => {//iteramos sobre cada documento
  const data = doc.data();
this.listarDirectivos.push({

  id: doc.data['id'],
  ...doc.data()
})

 //mostramos los datos del documento
  });
  this.listarDirectivos.sort((a, b) => {
    if(this.selectCarrera == 'Ing. Software'){
   
      this.listarDirectivos = this.listarDirectivos.filter(directivo => directivo.carrera == this.selectCarrera );
    } 

    if(this.selectstatus == 'Activos'){
      this.listarDirectivos = this.listarDirectivos.filter(directivo =>directivo.activo !== 'danger');
    }
    if(this.selectstatus == 'Inactivos'){
      this.listarDirectivos = this.listarDirectivos.filter(directivo =>directivo.activo !== 'success');
    
    }
    if(this.selectCarrera == 'Ing. Redes' ){
      this.listarDirectivos = this.listarDirectivos.filter(directivo => directivo.carrera == this.selectCarrera);
    } 


    return a.apellidoPaterno.localeCompare(b.apellidoPaterno);
    });


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
          
      const place2 = doc(this.firebase, 'directivo/'+ id );
      const snap2 = await getDoc(place2);
      if(snap2.exists()){//si existe buscamos el perfil
      const dato2 = snap2.data();
      
      const directivo: dir = {
        id:dato2['id'],
        nombre: dato2['nombre'],
        apellidoPaterno: dato2['apellidoPaterno'],
        apellidoMaterno: dato2['apellidoMaterno'],
        carrera: dato2['carrera'],
        cargo: dato2['cargo'],
        correo: dato2['correo'],
        matricula:  dato2['matricula'],
        psw: dato2['psw'],
        perfil: dato2['perfil'],
        activo: 'danger',
        
      }
      
      this._directivo.doc(directivo).then(()=>{
         this.refresh();
      });
      }
    }

    async activar(id: any){
   
      const place2 = doc(this.firebase, 'directivo/'+ id );
      const snap2 = await getDoc(place2);
      if(snap2.exists()){//si existe buscamos el perfil
      const dato2 = snap2.data();
      
      const directivo: dir = {

        id:dato2['id'],
        nombre: dato2['nombre'],
        apellidoPaterno: dato2['apellidoPaterno'],
        apellidoMaterno: dato2['apellidoMaterno'],
        carrera: dato2['carrera'],
        cargo: dato2['cargo'],
        correo: dato2['correo'],
        matricula:  dato2['matricula'],
        psw: dato2['psw'],
        perfil: dato2['perfil'],
        activo: 'success',
        
      }
      
      this._directivo.doc(directivo).then(()=>{
         this.refresh();
      });
      }
    }
    refresh(): void {
      this.ngOnInit();
      }


      async eye(id: any){
        const place = doc(this.firebase, 'directivo/'+ id );
        const snap = await getDoc(place);
        if(snap.exists()){//si existe buscamos el perfil
          const dato = snap.data();
          this.nombreModal = dato['nombre'];
          this.ApellidoPModal = dato['apellidoPaterno'];
          this.ApellidoMModal = dato['apellidoMaterno'];
          this.CargoModal = dato['cargo'];
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
          '<td> cargo: '+this.CargoModal+'</td><br><br>'+
          '<td> Perfil: '+this.PerfilModal+'</td><br><br>'+
          '</div>'
    
    
      })  
      }
  
    async Modificar(id: any){
      
  const placeRef = doc(this.firebase, 'directivo', id);//buscamos la colección en la base de datos
  const docSnap = await getDoc(placeRef);
  if(docSnap.exists()){
  const data = docSnap.data();
  this._directivo.setRegistro(data['id']);
  this.router.navigate(['ModificarDirectivo/'+ this.id ]);
  }
  }
  
  crearEstudiante(){
    this.router.navigate(['crearDirectivo/'+ this.id ]);
  }
  
  
  }
