import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, addDoc,getDoc, doc,setDoc,collection,collectionData , getFirestore, FirestoreModule, getDocs, deleteDoc} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { newcancion } from 'src/app/models/newcancion';
import { CancionService } from 'src/app/services/cancion.service';

@Component({
  selector: 'app-tabla-karaoke',
  templateUrl: './tabla-karaoke.component.html',
  styleUrls: ['./tabla-karaoke.component.css']
})
export class TablaKaraokeComponent {

  listarCanciones: newcancion[] = [];
  descripcion: string | undefined;
  nombre: string | undefined;
  src: string | undefined;
  
  id: string | null | undefined;
  
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private firebase: Firestore,
    private crearcancion: CancionService
       ){}
  
     ngOnInit(){
      this.id = this.aRouter.snapshot.paramMap.get('id');
      this.tabla();
 
  }

  async tabla(){
    this.listarCanciones = [];
    const colRef = collection(this.firebase, 'cancion');//buscamos la colección en la base de datos
    const querySnapshot = await getDocs(colRef);
    
    querySnapshot.forEach((doc: any) => {//iteramos sobre cada documento
    const data = doc.data();
  this.listarCanciones.push({
  
    id: doc.data['id'],
    ...doc.data()
  })
    });
    this.listarCanciones.sort((a, b) => {

      return a.nombre.localeCompare(b.nombre);
      }); 
  }

  async eye(id: any){

    const place = doc(this.firebase, 'cancion/'+ id );
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
      const docRef = doc(this.firebase, 'cancion', id); //obtiene la referencia del documento por su id
      await deleteDoc(docRef).then(() =>{
        this.listarCanciones = this.listarCanciones.filter(cancion => cancion.id !== id);
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
     this.crearcancion.setRegistro;
     this.crearcancion.setRegistro(id);
     this.router.navigate(['ModificarCancion/'+ this.id ]);
  }

  crearLink(){
    this.router.navigate(['RegistroCancion/'+ this.id ]);
  }
}
