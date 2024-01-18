import { Injectable } from '@angular/core';
import { Component, inject } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Firestore, addDoc,getDoc, doc,setDoc,collection,collectionData , getFirestore, FirestoreModule} from '@angular/fire/firestore';
import { est } from '../models/est';
import { Auth, createUserWithEmailAndPassword,authState,signInWithEmailAndPassword, signOut, updateCurrentUser, AuthSettings} from '@angular/fire/auth';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { collectionGroup } from 'firebase/firestore';
import { Observable, Subject, identity } from 'rxjs';
import { FirebaseApp, FirebaseApps, FirebaseOptions } from '@angular/fire/app';
import { mast } from '../models/mast';

@Injectable({
  providedIn: 'root'
})
export class MaestrosService {
  private registro: string | undefined;
  private docente$ = new Subject<any>();
  constructor(private firebase: Firestore, private auth: Auth,private db: AngularFireDatabase) { }


  crearMaestro(maestro: mast){
    return createUserWithEmailAndPassword(this.auth, maestro.correo,maestro.psw);
    }

    getId(maestro: mast){  //obtener el id
      return this.auth.currentUser;      
    }

    doc(maestro: mast){//guardar en la firebase
      const placeRef = doc(this.firebase,`/maestro/${maestro.id}`);
      return setDoc(placeRef,maestro);
    }
    edit(docente: mast){
      this.docente$.next(docente);
    }

    getDocente(): Observable<mast>{
      return this.docente$.asObservable();  
    }

    setRegistro(id: string) {
      this.registro = id;
    }
  
    getRegistro() {
      return this.registro;
    }
  
}
