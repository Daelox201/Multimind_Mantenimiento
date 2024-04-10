import {  Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, addDoc,getDoc, doc,setDoc,collection,collectionData , getFirestore, FirestoreModule, getDocs, deleteDoc} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { newpalabra } from 'src/app/models/newpalabra';
import { PalabraService } from 'src/app/services/palabra.service';
@Component({
  selector: 'app-tabla-palabras',
  templateUrl: './tabla-palabras.component.html',
  styleUrls: ['./tabla-palabras.component.css']
})
export class TablaPalabrasComponent {

  ListarPalabras: newpalabra[] = [];

  palabra: string | undefined;
  
  id: string | null | undefined;
  
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private firebase: Firestore,
    private word: PalabraService
    ){}
     ngOnInit(){
    this.id = this.aRouter.snapshot.paramMap.get('id');
    this.tabla();
  }
  async tabla(){
    this.ListarPalabras = [];
    const colRef = collection(this.firebase, 'palabra');//buscamos la colección en la base de datos
    const querySnapshot = await getDocs(colRef);
    querySnapshot.forEach((doc: any) => {//iteramos sobre cada documento
    const data = doc.data();
    this.ListarPalabras.push({
    id: doc.data['id'],
    ...doc.data()
  })
    });
    this.ListarPalabras.sort((a, b) => {
      return a.palabra.localeCompare(b.palabra);
      }); 
  }
    async eleminar(id: any){
      const docRef = doc(this.firebase, 'palabra', id); //obtiene la referencia del documento por su id
      await deleteDoc(docRef).then(() =>{
        this.ListarPalabras = this.ListarPalabras.filter(word => word.id !== id);
        this.toastr.success('La pregunta se correctamente', 'Eliminacion exitosa');
      }, error =>{
        this.toastr.error('El registro no se elimino', 'Error')
      }); //elimina el documento
       //elimina el registro de la lista
    }
    
  borrarLectura(id:any){
    Swal.fire({
      title: '¿Quiere borrar la palabra?',
      text: "En este apartado borrara la lectura y sus datos en definitiva",
      icon: 'warning',
      iconColor: 'red',
      showCancelButton: true,
      confirmButtonText: 'Borrar', 
      confirmButtonColor: 'red ',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.eleminar(id);   
      }
    })
  }
   async Modificar(id:any ){
     this.word.setRegistro;
     const placeRef = doc(this.firebase, 'palabra', id);//buscamos la colección en la base de datos
     this.word.setRegistro(id);
     this.router.navigate(['ModificarPalabra/'+ this.id ]);  
  }
    crearPalabra(){
      this.router.navigate(['RegistroPlabara/'+ this.id ]);
    }

}
