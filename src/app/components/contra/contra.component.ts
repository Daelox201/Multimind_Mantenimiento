import { Component, OnInit } from '@angular/core';
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
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, addDoc,getDoc, doc,setDoc,collection,collectionData , getFirestore, FirestoreModule, getDocs, deleteDoc} from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword,authState ,signInWithEmailAndPassword, signOut, updateCurrentUser} from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { est } from 'src/app/models/est';
import { AdminlogService } from 'src/app/services/adminlog.service';
import { MaestrosService } from 'src/app/services/maestros.service';
import { mast } from 'src/app/models/mast';

import { Subject } from 'rxjs';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { preg } from 'src/app/models/preg';
import { getAuth, updatePassword, updateProfile } from "firebase/auth";
import * as CryptoJS from "crypto-js";
import { dir } from 'src/app/models/dir';
import { DirectivosService } from 'src/app/services/directivos.service';
import { admin } from 'src/app/models/admin';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contra',
  templateUrl: './contra.component.html',
  styleUrls: ['./contra.component.css']
})
export class ContraComponent {


  loading = false;
  accs: boolean = true;
  forms:FormGroup;
  cambio: boolean = false;
  pase: boolean=false;

  id: string | null | undefined;

  constructor(private fb: FormBuilder,
    private adminlogService: AdminlogService,
    private toastr: ToastrService,
    private router: Router,
    public preguntaService: PreguntasService,
    private aRouter: ActivatedRoute,
    private auth: AngularFireAuth,
    private DocenteService: MaestrosService,
    private firebase: Firestore,
    private AlumnoService: AlumnoService,
    private _directivo: DirectivosService,
    private authService: AuthService,
    ){
      this.forms = this.fb.group({

        password: ['',Validators.required],
        password2:['',Validators.required]
      })

 }

 ngOnInit(): void{

  this.id = this.aRouter.snapshot.paramMap.get('id');
 }
 
 async cambiar(){
  this.pase = false;
  this.loading = true; 
    this.loading = false;
    this.loading = true;
    this.auth.currentUser.then(async user => {//validando id de susuario
      if (user && user.uid){//si existe el usuario 
        const placeRef = doc(this.firebase, 'alumno', user.uid );//buscamos el usuario en la base de datos
        const docSnap = await getDoc(placeRef);

        const place3 = doc(this.firebase, 'maestro/', user.uid );
        const snap3 = await getDoc(place3); 

        const place4 = doc(this.firebase, 'directivo/', user.uid );
        const snap4 = await getDoc(place4);

        const place5 = doc(this.firebase, 'Admin/', user.uid );
        const snap5 = await getDoc(place5); 

        
        if(docSnap.exists()){//si existe buscamos el perfil
          const data = docSnap.data();
          const perfil = data['perfil'];//sacamos el perfil de la base de datos
          const nombre = data['nombre'];
          const apellidoPaterno = data['apellidoPaterno'];
          const activo = data['activo'];
          this.id = data['id'];
          if(perfil == 'estudiante'){//comprobar si es estudiante
            if (this.authService.login(perfil, activo)){



              if(this.forms.value.password == this.forms.value.password2 ){
                        const encryptedMessage = CryptoJS.AES.encrypt(this.forms.value.password, '').toString();
                        // console.log('Encrypted Message:', encryptedMessage);
                
                  const alumno: est = {
                    id: data['id'],
                    nombre: data['nombre'],
                    apellidoPaterno: data['apellidoPaterno'],
                    apellidoMaterno: data['apellidoMaterno'],
                    correo: data['correo'],
                    matricula: data['matricula'],
                    carrera: data['carrera'],
                    tutor:  data['tutor'],      
                    psw: encryptedMessage,
                    perfil: 'estudiante',
                    test: data['test'],
                    activo: data['activo'],
                    IL: data['IL'],
                    ILM:  data['ILM'],
                    IVE:  data['IVE'],
                    IKC:  data['IKC'],
                    IM: data['IM'],
                    IITRA:  data['IITRA'],
                    IINTER: data['IINTER'],
                    intentos: data['intentos'],
                  }
                
                    this.auth.currentUser.then( users => {//validando id de susuario
                      if(users && users.updatePassword){
                
                        const decryptedBytes = CryptoJS.AES.decrypt(encryptedMessage,  '');
                        const decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
                        // console.log('Decrypted Message:', decryptedMessage);
                      
                      users.updatePassword(this.forms.value.password).then(()=>{
                        this.AlumnoService.doc(alumno).then(()=>{
                        this.AlumnoService.doc(alumno);
                      })
                        this.toastr.success('Cambio de contraseña', 'La contraseña se cambio exitosamente');
                        this.router.navigate(['principalEstudiante/'+ this.id ]);
                      },error =>{
                        this.errorDebil();
                      });
                      }
      })
}if(this.forms.value.password !== this.forms.value.password2){
  this.errorIgual();
     }

              
          }
        }
          }
          if(snap3.exists()){//si existe buscamos el perfil de dovente
            const data3 = snap3.data();
            this.id = data3['id'];
            const perfil = data3['perfil'];//sacamos el perfil de la base de datos
            const nombre = data3['nombre'];
            const activo = data3['activo'];
            if(perfil == 'docente'){//comprobar si es estudiante
              if (this.authService.login(perfil, activo)){
                const decryptedBytes = CryptoJS.AES.decrypt(data3['psw'],  '');//este es el metodo de desemcryptacion
                const decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
                this.pase = true;
                  if(this.pase===true){
                    if(this.forms.value.password == this.forms.value.password2 ){
               
                      const encryptedMessage = CryptoJS.AES.encrypt(this.forms.value.password, '').toString();
                      // console.log('Encrypted Message:', encryptedMessage)
              
                const docente: mast = {
                  id: data3['id'],
                 nombre: data3['nombre'],
                 apellidoPaterno: data3['apellidoPaterno'],
                 apellidoMaterno: data3['apellidoMaterno'],
                 carrera: data3['carrera'],
                 tiempo: data3['tiempo'],
                 correo: data3['correo'],
                 matricula: data3['matricula'],
                 perfil: 'docente',
                 psw: encryptedMessage,
                 activo: data3['activo'],
              }
                  this.auth.currentUser.then( users => {//validando id de susuario
                    if(users && users.updatePassword){
                    
                    const decryptedBytes = CryptoJS.AES.decrypt(encryptedMessage,  '');
                      const decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
                      // console.log('Decrypted Message:', decryptedMessage);
                    users.updatePassword(this.forms.value.password).then(()=>{
                    this.DocenteService.doc(docente).then(()=>{
                    this.DocenteService.doc(docente);
                  })
            
                      this.toastr.success('Cambio de contraseña', 'La contraseña se cambio exitosamente');
                      this.router.navigate(['principalDocente/'+ this.id ]);
                    },error =>{
                     
                      this.errorDebil();
            
                    });
                    }
                })
              }if(this.forms.value.password !== this.forms.value.password2){
                this.errorIgual();
            
              }
            }
              } 
              }
            
              }  
              if(snap4.exists()){//si existe buscamos el perfil
                const data4 = snap4.data();
        
                this.id = data4['id'];
                const perfil = data4['perfil'];//sacamos el perfil de la base de datos
                const nombre = data4['nombre'];
                const activo = data4['activo'];
                if(perfil == 'directivo'){//comprobar si es estudiante
                  if (this.authService.login(perfil, activo)){
                    if(this.forms.value.password == this.forms.value.password2 ){
                      const encryptedMessage = CryptoJS.AES.encrypt(this.forms.value.password, '').toString();
                      // console.log('Encrypted Message:', encryptedMessage);
              
                const directivo: dir = {
                  id: data4['id'],
                  nombre: data4['nombre'],
                  apellidoPaterno: data4['apellidoPaterno'],
                  apellidoMaterno: data4['apellidoMaterno'],
                  correo: data4['correo'],
                  matricula: data4['matricula'],
                  carrera: data4['carrera'],
                  cargo:  data4['cargo'],      
                  psw: encryptedMessage,
                  perfil: data4['perfil'],
                  activo: data4['activo'],
                }
              
                  this.auth.currentUser.then( users => {//validando id de susuario
                    if(users && users.updatePassword){
              
                      const decryptedBytes = CryptoJS.AES.decrypt(encryptedMessage,  '');
                      const decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
                      // console.log('Decrypted Message:', decryptedMessage);
                    
                    users.updatePassword(this.forms.value.password).then(()=>{
                      this._directivo.doc(directivo).then(()=>{
                      this._directivo.doc(directivo);
                    })
                      this.toastr.success('Cambio de contraseña', 'La contraseña se cambio exitosamente');
                      this.router.navigate(['principalDirector/'+ this.id ]);
                    },error =>{
                      this.errorDebil();
                    });
                    }
                  
                })
              }if(this.forms.value.password !== this.forms.value.password2){
                this.errorIgual();
              }
                }
              }
                   
                  
                  
                
                }
                if(snap5.exists()){//si existe buscamos el perfil
                    const data5 = snap5.data();
                    this.id = data5['id']
                    const perfil = data5['perfil'];//sacamos el perfil de la base de datos
                    const activo = data5['activo'];
                    if(perfil == 'Admin'){//comprobar si es estudiante
                      if (this.authService.login(perfil, activo)){
                        if(this.forms.value.password == this.forms.value.password2 ){
                          const encryptedMessage = CryptoJS.AES.encrypt(this.forms.value.password, '').toString();
                          // console.log('Encrypted Message:', encryptedMessage);
                  
                    const admi: admin = {
                      id: data5['id'],
                      correo: data5['correo'],
                      psw: encryptedMessage,
                      perfil: data5['perfil'],
                  
                  
                    }
                  
                      this.auth.currentUser.then( users => {//validando id de susuario
                        if(users && users.updatePassword){
                  
                          const decryptedBytes = CryptoJS.AES.decrypt(encryptedMessage,  '');
                          const decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
                          // console.log('Decrypted Message:', decryptedMessage);
                        
                        users.updatePassword(this.forms.value.password).then(()=>{
                          this.adminlogService.doc(admi).then(()=>{
                          this.adminlogService.doc(admi);
                        })
                          this.toastr.success('Cambio de contraseña', 'La contraseña se cambio exitosamente');
                          this.router.navigate(['principalAdmin/'+ this.id ]);
                        },error =>{
                          this.errorDebil();
                        });
                        }
                      
                    })
                  }if(this.forms.value.password !== this.forms.value.password2){
                    this.errorIgual();
                  }
                      
                      }
                    }
                    
                  }
      }
      this.loading = false;
    })

this.loading = false;
 }

 user(){

 }
 errorDebil(){
  Swal.fire({
    icon: 'error',
    title: 'La contraseña no fue cambiada',
    text: 'La contraseña es muy debil',
  })
 }

 errorIgual(){
  Swal.fire({
    icon: 'error',
    title: 'La contraseña no fue cambiada',
    text: 'Las contraseñas no son iguales',
  })
 }
 errorVieja(){
  Swal.fire({
    icon: 'error',
    title: 'La contraseña no fue cambiada',
    text: 'La contraseña antigua no es correcta',
  })
 }







 encryptMessage() {
  const message = 'Hello World';
  const encryptedMessage = CryptoJS.AES.encrypt(this.forms.value.password, '').toString();

}


  

} 



