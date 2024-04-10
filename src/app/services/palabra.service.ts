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
import { newlectura } from '../models/newlectura';
import { newvideo } from '../models/newvideo';
import { newpalabra } from '../models/newpalabra';

@Injectable({
  providedIn: 'root'
})
export class PalabraService  {
  private registros: string | undefined;
  constructor(private firebase: Firestore, private auth: Auth,private db: AngularFireDatabase) { }


  doc(palabra: newpalabra){//guardar en la firebase pero dandole un id
    const placeRef = doc(this.firebase,`/palabra/${palabra.id}`);
    return setDoc(placeRef,palabra);
  }

  registro(palabra: newpalabra){// guarda en la firebase pero creando el id automatico
    const placeRef = collection(this.firebase, 'palabra');
    return addDoc(placeRef,palabra);
   }

   setRegistro(id: string) {
    this.registros = id;
  }

  getRegistro() {
    return this.registros;
  }
}
