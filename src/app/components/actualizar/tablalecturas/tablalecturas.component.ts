import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, addDoc,getDoc, doc,setDoc,collection,collectionData , getFirestore, FirestoreModule, getDocs, deleteDoc} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { newlectura } from 'src/app/models/newlectura';
import { LecturaService } from 'src/app/services/lectura.service';
@Component({
  selector: 'app-tablalecturas',
  templateUrl: './tablalecturas.component.html',
  styleUrls: ['./tablalecturas.component.css']
})
export class TablalecturasComponent  {

  listarLecturas: newlectura[] = [];

  titulo: string | undefined  ;
  lectura: string | undefined;
  preg1Modal: string | undefined;
  preg2Modal: string | undefined;
  preg3Modal: string | undefined;
  preg4Modal: string | undefined;
  preg5Modal: string | undefined;
  resp1Modal: string | undefined;
  resp2Modal: string | undefined;
  resp3Modal: string | undefined;
  resp4Modal: string | undefined;
  resp5Modal: string | undefined;

  
  id: string | null | undefined;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private firebase: Firestore,
    private newlectura: LecturaService
    ){  }
  
     ngOnInit(){
    this.id = this.aRouter.snapshot.paramMap.get('id');
    this.tabla();
 
  }

  async tabla(){
    this.listarLecturas = [];
    const colRef = collection(this.firebase, 'lectura');//buscamos la colección en la base de datos
    const querySnapshot = await getDocs(colRef);
    
    querySnapshot.forEach((doc: any) => {//iteramos sobre cada documento
    const data = doc.data();
  this.listarLecturas.push({
  
    id: doc.data['id'],
    ...doc.data()
  })
    });
    this.listarLecturas.sort((a, b) => {

      return a.titulo.localeCompare(b.titulo);
      }); 
  }

  async eye(id: any){
    const place = doc(this.firebase, 'lectura/'+ id );
    const snap = await getDoc(place);
    if(snap.exists()){//si existe buscamos el perfil
      const dato = snap.data();
      this.titulo = dato['titulo'];
      this.lectura = dato['lectura'];
      this.preg1Modal = dato['preg1'];
      this.preg2Modal = dato['preg1'];
      this.preg3Modal = dato['preg1'];
      this.preg4Modal = dato['preg1'];
      this.preg5Modal = dato['preg1'];
      this.resp1Modal = dato['resp1'];
      this.resp2Modal = dato['resp2'];
      this.resp3Modal = dato['resp3'];
      this.resp4Modal = dato['resp4'];
      this.resp5Modal = dato['resp5'];

    } 
    Swal.fire({
      title:'Informacion de la lectura',
      html:
      '<div class=""><br><br>'+
      '<td> titulo: '+this.titulo+'</td><br><br>'+
      '<td> Lectura: '+this.lectura+'</td><br><br>'+
      '<td> P1: '+this.preg1Modal+'</td><br><br>'+
      '<td> R1: '+this.resp1Modal+'</td><br><br>'+
      '<td> P1: '+this.preg2Modal+'</td><br><br>'+
      '<td> R1: '+this.resp2Modal+'</td><br><br>'+
      '<td> P1: '+this.preg3Modal+'</td><br><br>'+
      '<td> R1: '+this.resp3Modal+'</td><br><br>'+
      '<td> P1: '+this.preg4Modal+'</td><br><br>'+
      '<td> R1: '+this.resp4Modal+'</td><br><br>'+
      '<td> P1: '+this.preg5Modal+'</td><br><br>'+
      '<td> R1: '+this.resp5Modal+'</td><br><br>'+
      '</div>'


  })  
  }
  
  
    async eliminarlectura(id: any){
      const docRef = doc(this.firebase, 'lectura', id); //obtiene la referencia del documento por su id
      await deleteDoc(docRef).then(() =>{
        this.listarLecturas = this.listarLecturas.filter(lectura => lectura.id !== id);
      }, error =>{
        this.toastr.error('El registro no se elimino', 'Error')
      }); //elimina el documento
       //elimina el registro de la lista
    }

  borrarLectura(id:any){
    Swal.fire({
      title: '¿Quiere borrar la lectura?',
      text: "En este apartado borrara la lectura y sus datos en definitiva",
      icon: 'warning',
      iconColor: 'red',

      showCancelButton: true,
      confirmButtonText: 'Borrar', 
      
      confirmButtonColor: 'red ',

    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.eliminarlectura(id);
       
      
      }
    })
  }
  
   async Modificar(id:any ){
     this.newlectura.setRegistro;
     const placeRef = doc(this.firebase, 'lista', id);//buscamos la colección en la base de datos
     this.newlectura.setRegistro(id);
     this.router.navigate(['ModificarLectura/'+ this.id ]);
     
  }
  
  crearLectura(){
    this.router.navigate(['ActVerbal/'+ this.id ]);
  }
  
  
  }

