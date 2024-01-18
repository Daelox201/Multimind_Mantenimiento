import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, addDoc,getDoc, doc,setDoc,collection,collectionData , getFirestore, FirestoreModule, getDocs} from '@angular/fire/firestore';
import Swal from 'sweetalert2';
import { newvideo } from 'src/app/models/newvideo';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-baile',
  templateUrl: './baile.component.html',
  styleUrls: ['./baile.component.css']
})
export class BaileComponent {
  id: string | null | undefined;
  listarvideos: newvideo[] = [];

  titulo: string | undefined; 
  Descripcion: string | undefined; 
  SRC: string = "" ;
  dangerousUrl: string | undefined;
  trustedUrl: SafeResourceUrl | undefined;
  constructor(
    private router: Router,
    private aRouter: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private firebase: Firestore){

    }
    ngOnInit(): void{
      this.id = this.aRouter.snapshot.paramMap.get('id');
      this.tabla();
      
     }  

     async tabla(){
      this.listarvideos = [];
      const colRef = collection(this.firebase, 'video');//buscamos la colección en la base de datos
      const querySnapshot = await getDocs(colRef);
      const cantidadDocumentos = querySnapshot.size;
    
      if (cantidadDocumentos > 0) {
        // Generar un número aleatorio entre 0 y cantidadDocumentos - 1
        const indiceAleatorio = Math.floor(Math.random() * cantidadDocumentos);
        
        // Obtener el documento en el índice aleatorio
        let contador = 0;
    
        querySnapshot.forEach((doc) => {
          if (contador === indiceAleatorio) {
    
            this.Descripcion = doc.data()['Descripcion'];
            this.titulo = doc.data()['nombre']; 
            this.SRC = doc.data()['src'];
            this.dangerousUrl = this.SRC;
            this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousUrl);
          }
          contador++;
        });
      } else {
    
      }
    }
    terminar(){
      Swal.fire({
        title: '¿Quiere salir?',
        text: "¿Seguro que quieres regresar? ",
        icon: 'question',
        iconColor: 'blue',
  
        showCancelButton: true,
        confirmButtonText: 'Terminar', 
        
        confirmButtonColor: '#008f39 ',
  
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.router.navigate(['Corporal/'+ this.id ]);
         
        
        }
      })
    }

}
