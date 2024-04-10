import { Injectable } from '@angular/core';
import { Component, inject } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Firestore, addDoc,getDoc, doc,setDoc,collection,collectionData , getFirestore, FirestoreModule} from '@angular/fire/firestore';
import { est } from '../models/est';
import { Auth, createUserWithEmailAndPassword,authState,signInWithEmailAndPassword, signOut, updateCurrentUser, AuthSettings} from '@angular/fire/auth';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { collectionGroup } from 'firebase/firestore';
import { identity } from 'rxjs';
import { FirebaseApp, FirebaseApps, FirebaseOptions } from '@angular/fire/app';
import { dir } from '../models/dir';

@Injectable({
  providedIn: 'root'
})
export class DirectivosService {
  private registro: string | undefined;
  constructor(private firebase: Firestore, private auth: Auth,private db: AngularFireDatabase) { }


  crearDirectivo(directivo: dir){
    return createUserWithEmailAndPassword(this.auth, directivo.correo,directivo.psw);
    }

    getId(directivo: dir){  //obtener el id
      return this.auth.currentUser;      
    }

    doc(directivo: dir){//guardar en la firebase
      const placeRef = doc(this.firebase,`/directivo/${directivo.id}`);
      return setDoc(placeRef,directivo);
    }

    
    setRegistro(id: string) {
      this.registro = id;
    }
  
    getRegistro() {
      return this.registro;
    }
}
