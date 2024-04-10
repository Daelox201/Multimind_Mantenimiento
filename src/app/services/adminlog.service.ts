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
import { admin } from '../models/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminlogService {

  constructor(private auth: Auth, private firebase: Firestore, private db: AngularFireDatabase) { }

  register({email,password}: any){
    return createUserWithEmailAndPassword(this.auth, email,password);
  } 
  login({email,password}: any){
    return signInWithEmailAndPassword(this.auth, email,password);
  }
  logout(){
    return signOut(this.auth);
  }
  crearAdmin(directivo: admin){
    return createUserWithEmailAndPassword(this.auth, directivo.correo,directivo.psw);
    }
    getId(directivo: admin){  //obtener el id
      return this.auth.currentUser;      
    }
    doc(directivo: admin){//guardar en la firebase
      const placeRef = doc(this.firebase,`/Admin/${directivo.id}`);
      return setDoc(placeRef,directivo);
    }
}
  