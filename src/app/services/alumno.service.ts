import { Injectable } from '@angular/core';
import { Component, inject } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Firestore, addDoc,getDoc, doc,setDoc,collection,collectionData , getFirestore, FirestoreModule} from '@angular/fire/firestore';
import { est } from '../models/est';
import { Auth, createUserWithEmailAndPassword,authState,signInWithEmailAndPassword, signOut, updateCurrentUser, AuthSettings} from '@angular/fire/auth';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { collectionGroup, updateDoc } from 'firebase/firestore';
import { Observable, ObservableLike, identity } from 'rxjs';
import { FirebaseApp, FirebaseApps, FirebaseOptions } from '@angular/fire/app';
import { User, deleteUser, updatePassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private registro: string | undefined;
  constructor(private firebase: Firestore, private auth: Auth,private db: AngularFireDatabase) { }

  crearAlumno(alumnos: est){
    return createUserWithEmailAndPassword(this.auth, alumnos.correo,alumnos.psw);
    }

  datosAlumno(alumnos: est){
     const placeRef = collection(this.firebase, 'alumno');
     return addDoc(placeRef,alumnos);
    }
  getId(alumnos: est){  //obtener el id del alumno
      return this.auth.currentUser;      
    }

  doc(alumnos: est){//guardar en la firebase
      const placeRef = doc(this.firebase,`/alumno/${alumnos.id}`);
      return setDoc(placeRef,alumnos);
    }

    setRegistro(id: string) {
      this.registro = id;
    }
  
    getRegistro() {
      return this.registro;
    }
}
