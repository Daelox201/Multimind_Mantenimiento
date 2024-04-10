import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Firestore, addDoc,getDoc, doc,setDoc,collection,collectionData , getFirestore, FirestoreModule} from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword,authState,signInWithEmailAndPassword, signOut, updateCurrentUser, AuthSettings} from '@angular/fire/auth';
import { newcancion } from '../models/newcancion';


@Injectable({
  providedIn: 'root'
})
export class CancionService {
  private registros: string | undefined;
  constructor(private firebase: Firestore, private auth: Auth,private db: AngularFireDatabase) { }


  doc(cancion: newcancion){//guardar en la firebase pero dandole un id
    const placeRef = doc(this.firebase,`/cancion/${cancion.id}`);
    return setDoc(placeRef,cancion);
  }

  registro(cancion: newcancion){// guarda en la firebase pero creando el id automatico
    const placeRef = collection(this.firebase, 'cancion');
    return addDoc(placeRef,cancion);
   }

   setRegistro(id: string) {
    this.registros = id;
  }

  getRegistro() {
    return this.registros;
  }
}