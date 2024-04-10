import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, addDoc,getDoc, doc,setDoc,collection,collectionData , getFirestore, FirestoreModule, getDocs, deleteDoc} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { est } from 'src/app/models/est';
import { AdminlogService } from 'src/app/services/adminlog.service';


@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})


export class PruebaComponent {
  listarAlumnos: est[] = [];
  Mod: est[] = [];
  nombre: String | undefined ;
  apeM: String | undefined  ;
  perfi: String | undefined;
  apeP: String | undefined  ;
  loading = false;
  alumnoMenu: boolean = false;
  docenteMenu: boolean = false;
  dirMenu: boolean = false;
  admin: boolean = false;

id: string | null | undefined;
  constructor(
    private adminlogService: AdminlogService,
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private firebase: Firestore,
    ){}
 ngOnInit(){
  this.id = this.aRouter.snapshot.paramMap.get('id');
this.prueba();
}
  async prueba(){
  this.nombre = "";
  this.apeP = "";
  this.apeM = "";
  this.perfi = "";

      const place = doc(this.firebase, 'maestro/'+ this.id );
      const place2 = doc(this.firebase, 'alumno/'+ this.id );
      const place3 = doc(this.firebase, 'directivo/'+ this.id );
      const place4 = doc(this.firebase, 'Admin/'+ this.id );//buscamos el usuario en la base de datos
      const snap = await getDoc(place);
      if(snap.exists()){//si existe buscamos el perfil
        const dato = snap.data();
        this.loading = true;
        this.docenteMenu = true;
        this.nombre = dato['nombre'];
        this.apeP = dato['apellidoPaterno'];
        this.apeM = dato['apellidoMaterno'];
        this.perfi = "DOCENTE: ";
      } 
      //buscamos el usuario en la base de datos
      const snap2 = await getDoc(place2);
      if(snap2.exists()){//si existe buscamos el perfil
        const dato2 = snap2.data();
        this.loading = true;
        this.alumnoMenu = true;
        this.nombre = dato2['nombre'];
        this.apeP = dato2['apellidoPaterno'];
        this.apeM = dato2['apellidoMaterno'];
        this.perfi = "ESTUDIANTE: ";
        } 
        //buscamos el usuario en la base de datos
        const snap3 = await getDoc(place3);
        if(snap3.exists()){//si existe buscamos el perfil
          const dato3 = snap3.data();
          this.loading = true;
          this.dirMenu = true;
          this.nombre = dato3['nombre'];
          this.apeP = dato3['apellidoPaterno'];
          this.apeM = dato3['apellidoMaterno'];
          this.perfi = "DIRECTIVO: ";
        }
          //buscamos el usuario en la base de datos
          const snap4 = await getDoc(place4);
          if(snap4.exists()){//si existe buscamos el perfil
            const dato4 = snap4.data();
            this.loading = true;
            this.admin = true;
            this.nombre = dato4['correo'];
            this.perfi = "ADMIN: ";
            
          }
        
}
salir(){
  this.adminlogService.logout().then(()=>{ 
    this.toastr.success('Saliste de la sesión', 'Hasta luego');
    this.router.navigate(['/inicio']);
  }).catch(error =>{
    this.toastr.error('No tiene permitido el acceso', 'Error')
    console.log(error);   
    })
}


menu(){
  // this.id = this.aRouter.snapshot.paramMap.get('id');
if(this.alumnoMenu === true ){
  this.router.navigate(['/principalEstudiante/'+ this.id]);
}if(this.docenteMenu === true){
  this.router.navigate(['/principalDocente/'+ this.id +'']);
}if(this.dirMenu === true){
  this.router.navigate(['/principalDirector/'+ this.id +'']);
}if(this.admin === true){
  this.router.navigate(['/principalAdmin/'+ this.id +'']);
}
  
}
}



