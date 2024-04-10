import { Component } from '@angular/core';
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
import { Firestore, addDoc,getDoc, doc,setDoc,collection,collectionData , getFirestore, FirestoreModule} from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword,authState ,signInWithEmailAndPassword, signOut, updateCurrentUser} from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { est } from 'src/app/models/est';
import { AdminlogService } from 'src/app/services/adminlog.service';
import { MaestrosService } from 'src/app/services/maestros.service';

@Component({
  selector: 'app-principal-admin',
  templateUrl: './principal-admin.component.html',
  styleUrls: ['./principal-admin.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule,MatSidenavModule,MatMenuModule]
})
export class PrincipalAdminComponent {


   
  constructor(private adminlogService: AdminlogService,
    private toastr: ToastrService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private _alumnoService: AlumnoService,
    private fb: FormBuilder,
    private _maestrosService: MaestrosService,
    private auth: AngularFireAuth,
    private firebase: Firestore){}

 ngOnInit(): void{
 
 }

  
  alumno(){
      this.router.navigate(['/lista']);
  }
  maestro(){
    this.router.navigate(['/CrearMaestro']);
  }
  directivo(){
    this.router.navigate(['/crearDirectivo']);
  }
  admin(){
    this.router.navigate(['/admin']);
  }


}

 

