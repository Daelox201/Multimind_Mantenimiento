import { Component } from '@angular/core';
import { ref } from 'firebase/database';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import { AlumnoService } from 'src/app/services/alumno.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Firestore, addDoc,getDoc, doc,setDoc,collection,collectionData , getFirestore, FirestoreModule, getDocs, deleteDoc} from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword,authState ,signInWithEmailAndPassword, signOut, updateCurrentUser} from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { est } from 'src/app/models/est';
import { AdminlogService } from 'src/app/services/adminlog.service';
import { MaestrosService } from 'src/app/services/maestros.service';
@Component({
  selector: 'app-navadmin',
  templateUrl: './navadmin.component.html',
  styleUrls: ['./navadmin.component.css']
})
export class NavadminComponent {

  listarAlumnos: est[] = [];
  Mod: est[] = [];
  nombre: String | undefined ;
  apeM: String | undefined  ;
  perfi: String | undefined;
  apeP: String | undefined  ;

  alumnoMenu: boolean = false;
  docenteMenu: boolean = false;
  dirMenu: boolean = false;
  admin: boolean = false;


  constructor(private fb: FormBuilder,
    private adminlogService: AdminlogService,
    private toastr: ToastrService,
    private router: Router,
    private _maestrosService: MaestrosService,
    private auth: AngularFireAuth,
    private firebase: Firestore,
    private AlumnoService: AlumnoService
    ){}

    async ngOnInit(){
      this.nombre = "";
      this.apeP = "";
      this.apeM = "";
      this.perfi = "";
  this.auth.user.subscribe(async users  =>{
    if (users && users.uid){//si existe el usuario 
      const place = doc(this.firebase, 'admin', users.uid );//buscamos el usuario en la base de datos
      const snap = await getDoc(place);
      if(snap.exists()){//si existe buscamos el perfil
        const dato = snap.data();
        this.docenteMenu = true;
        this.nombre = dato['nombre'];
        this.apeP = dato['apellidoPaterno'];
        this.apeM = dato['apellidoMaterno'];
        this.perfi = "Docente ";
      } 
    }
  });
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
  this.router.navigate(['/principalAdmin']);
}
}


