import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Firestore, addDoc,getDoc, doc,setDoc,collection,collectionData , getFirestore, FirestoreModule} from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword,authState,signInWithEmailAndPassword, signOut, updateCurrentUser, AuthSettings} from '@angular/fire/auth';
import { newdiario } from '../models/newdiario';

@Injectable({
  providedIn: 'root'
})
export class DiarioService {

    private registros: string | undefined;
  constructor(private firebase: Firestore, private auth: Auth,private db: AngularFireDatabase) { }

  doc(diario: newdiario){//guardar en la firebase pero dandole un id
    const placeRef = doc(this.firebase,`/diario/${diario.id}`);
    return setDoc(placeRef,diario);
  }

  registro(diario: newdiario){// guarda en la firebase pero creando el id automatico
    const placeRef = collection(this.firebase, 'diario');
    return addDoc(placeRef,diario);
   }

   setRegistro(id: string) {
    this.registros = id;
  }

  getRegistro() {
    return this.registros;
  }
}
