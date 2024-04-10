import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Firestore, addDoc,getDoc, doc,setDoc,collection,collectionData , getFirestore, FirestoreModule} from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword,authState,signInWithEmailAndPassword, signOut, updateCurrentUser, AuthSettings} from '@angular/fire/auth';
import { newvideo } from '../models/newvideo';
@Injectable({
  providedIn: 'root'
})
export class VideoService  {
  private registros: string | undefined;
  constructor(private firebase: Firestore, private auth: Auth,private db: AngularFireDatabase) { }


  doc(video: newvideo){//guardar en la firebase pero dandole un id
    const placeRef = doc(this.firebase,`/video/${video.id}`);
    return setDoc(placeRef,video);
  }

  registro(video: newvideo){// guarda en la firebase pero creando el id automatico
    const placeRef = collection(this.firebase, 'video');
    return addDoc(placeRef,video);
   }

   setRegistro(id: string) {
    this.registros = id;
  }

  getRegistro() {
    return this.registros;
  }
}
