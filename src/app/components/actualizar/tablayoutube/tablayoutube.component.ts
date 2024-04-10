import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, addDoc,getDoc, doc,setDoc,collection,collectionData , getFirestore, FirestoreModule, getDocs, deleteDoc} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { newvideo } from 'src/app/models/newvideo';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-tablayoutube',
  templateUrl: './tablayoutube.component.html',
  styleUrls: ['./tablayoutube.component.css']
})
export class TablayoutubeComponent{

  listarVideos: newvideo[] = [];
  descripcion: string | undefined;
  nombre: string | undefined;
  src: string | undefined;
  
  id: string | null | undefined;
  
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private firebase: Firestore,
    private crearvideo: VideoService
    ){}
  
     ngOnInit(){
      this.id = this.aRouter.snapshot.paramMap.get('id');
      this.tabla();
 
  }

  async tabla(){
    this.listarVideos = [];
    const colRef = collection(this.firebase, 'video');//buscamos la colección en la base de datos
    const querySnapshot = await getDocs(colRef);
    
    querySnapshot.forEach((doc: any) => {//iteramos sobre cada documento
    const data = doc.data();
  this.listarVideos.push({
  
    id: doc.data['id'],
    ...doc.data()
  })
    });
    this.listarVideos.sort((a, b) => {

      return a.nombre.localeCompare(b.nombre);
      }); 
  }

  async eye(id: any){

    const place = doc(this.firebase, 'video/'+ id );
    const snap = await getDoc(place);
    if(snap.exists()){//si existe buscamos el perfil
      const dato = snap.data();
      this.nombre = dato['nombre'];
      this.descripcion = dato['Descripcion'];
      this.src = dato['src'];

    } 
    Swal.fire({
      title:'Informacion de Usuario',
      html:
      '<div class=""><br><br>'+
      '<td> Nombre: '+this.nombre+'</td><br><br>'+
      '<td> Descripcion: '+this.descripcion+'</td><br><br>'+
      '<td> <iframe width="450" height="250" src='+this.src+' frameborder="0" allowfullscreen></iframe> </td><br><br>'+
      '</div>'
  })  
  }
  
  
    async eleminar(id: any){
      const docRef = doc(this.firebase, 'video', id); //obtiene la referencia del documento por su id
      await deleteDoc(docRef).then(() =>{
        this.listarVideos = this.listarVideos.filter(video => video.id !== id);
        this.toastr.success('El video se elimino correctamente', 'Eliminacion exitosa');
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
     this.crearvideo.setRegistro;
     const placeRef = doc(this.firebase, 'video', id);//buscamos la colección en la base de datos
     this.crearvideo.setRegistro(id);
     this.router.navigate(['ModificarVideo/'+ this.id ]);
  }
  crearLink(){
    this.router.navigate(['RegistroVideo/'+ this.id ]);
  }

}
