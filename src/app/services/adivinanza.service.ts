import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Firestore, addDoc,getDoc, doc,setDoc,collection,collectionData , getFirestore, FirestoreModule} from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword,authState,signInWithEmailAndPassword, signOut, updateCurrentUser, AuthSettings} from '@angular/fire/auth';
import { newadivinanza } from '../models/newadivinanza';

@Injectable({
  providedIn: 'root'
})
export class AdivinanzaService {
  private registros: string | undefined;
  constructor(private firebase: Firestore, private auth: Auth,private db: AngularFireDatabase) { }


  doc(adi: newadivinanza){//guardar en la firebase pero dandole un id
    const placeRef = doc(this.firebase,`/adivinanza/${adi.id}`);
    return setDoc(placeRef,adi);
  }

  registro(adi: newadivinanza){// guarda en la firebase pero creando el id automatico
    const placeRef = collection(this.firebase, 'adivinanza');
    return addDoc(placeRef,adi);
   }

   setRegistro(id: string) {
    this.registros = id;
  }

  getRegistro() {
    return this.registros;
  }

}
