import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, addDoc,getDoc, doc,setDoc,collection,collectionData , getFirestore, FirestoreModule, getDocs, deleteDoc} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { interpersonal } from 'src/app/models/interpersonal';
import { InterpreguntaService } from 'src/app/services/interpregunta.service';

@Component({
  selector: 'app-tablapregu',
  templateUrl: './tablapregu.component.html',
  styleUrls: ['./tablapregu.component.css']
})
export class TablapreguComponent {

  listarPreguntas: interpersonal[] = [];

  pregunta: string | undefined;
  correcta: string | undefined;
  mala1: string | undefined;
  mala2: string | undefined;
  mala3: string | undefined;
  
  id: string | null | undefined;
  
  loading = false;
  
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private firebase: Firestore,
    private pregu: InterpreguntaService
    ){ }
  
     ngOnInit(){
      this.id = this.aRouter.snapshot.paramMap.get('id');
    this.tabla();
  }
  async tabla(){
    this.listarPreguntas = [];
    const colRef = collection(this.firebase, 'Pregunta_Interpersonal');//buscamos la colección en la base de datos
    const querySnapshot = await getDocs(colRef);
    querySnapshot.forEach((doc: any) => {//iteramos sobre cada documento
    const data = doc.data();
    this.listarPreguntas.push({
    id: doc.data['id'],
    ...doc.data()
  })
    });
    this.listarPreguntas.sort((a, b) => {

      return a.pregunta.localeCompare(b.pregunta);
      }); 
  }
  async eye(id: any){
    const place = doc(this.firebase, 'Pregunta_Interpersonal/'+ id );
    const snap = await getDoc(place);
    if(snap.exists()){//si existe buscamos el perfil
      const dato = snap.data();
      this.pregunta = dato['pregunta'];
      this.correcta = dato['buena'];
      this.mala1 = dato['mala1'];
      this.mala2 = dato['mala2'];
      this.mala3 = dato['mala3'];
    } 
    Swal.fire({
      title:'Informacion de Usuario',
      html:
      '<div class=""><br><br>'+
      '<td> Pregunta: '+this.pregunta+'</td><br><br>'+
      '<td> Correcta: '+this.correcta+'</td><br><br>'+
      '<td> Mala 1: '+this.mala1+'</td><br><br>'+
      '<td> Mala 2: '+this.mala2+'</td><br><br>'+
      '<td> Mala 3: '+this.mala3+'</td><br><br>'+
      '</div>'
  })  
  }
  
  
    async eleminar(id: any){
      const docRef = doc(this.firebase, 'Pregunta_Interpersonal', id); //obtiene la referencia del documento por su id
      await deleteDoc(docRef).then(() =>{
        this.listarPreguntas = this.listarPreguntas.filter(pregunta => pregunta.id !== id);
        this.toastr.success('La pregunta se correctamente', 'Eliminacion exitosa');
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
        this.eleminar(id);
      }
    })
  }
   async Modificar(id:any ){
     this.pregu.setRegistro;
     this.loading = true;
     const placeRef = doc(this.firebase, 'Pregunta_Interpersonal', id);//buscamos la colección en la base de datos
     this.pregu.setRegistro(id);
     this.router.navigate(['ModificarPregunta/'+ this.id ]);
  }
    crearPregunta(){
      this.router.navigate(['RegistroPregunta/'+ this.id ]);
    }

}
