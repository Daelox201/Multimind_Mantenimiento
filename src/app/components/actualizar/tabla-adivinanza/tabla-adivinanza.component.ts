import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, addDoc,getDoc, doc,setDoc,collection,collectionData , getFirestore, FirestoreModule, getDocs, deleteDoc} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { newadivinanza } from 'src/app/models/newadivinanza';
import { AdivinanzaService } from 'src/app/services/adivinanza.service';

@Component({
  selector: 'app-tabla-adivinanza',
  templateUrl: './tabla-adivinanza.component.html',
  styleUrls: ['./tabla-adivinanza.component.css']
})
export class TablaAdivinanzaComponent {

  id: string | null | undefined;
  listarAdivinanzas:newadivinanza[] = [];

  adivinanza: string | undefined;
  pista: string | undefined;
  palabra: string | undefined;

  
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private firebase: Firestore,
    private adivi: AdivinanzaService
       ){}
  
     ngOnInit(){
      this.id = this.aRouter.snapshot.paramMap.get('id');
      this.tabla();
  }
  async tabla(){
    this.listarAdivinanzas = [];
    const colRef = collection(this.firebase, 'adivinanza');//buscamos la colección en la base de datos
    const querySnapshot = await getDocs(colRef);
    
    querySnapshot.forEach((doc: any) => {//iteramos sobre cada documento
    const data = doc.data();
  this.listarAdivinanzas.push({
  
    id: doc.data['id'],
    ...doc.data()
  })
    });
    this.listarAdivinanzas.sort((a, b) => {

      return a.palabra.localeCompare(b.palabra);
      }); 
  }
  async eye(id: any){

    const place = doc(this.firebase, 'adivinanza/'+ id );
    const snap = await getDoc(place);
    if(snap.exists()){//si existe buscamos el perfil
      const dato = snap.data();
      this.adivinanza = dato['adivinanza'];
      this.pista = dato['pista'];
      this.palabra = dato['palabra'];

    } 
    Swal.fire({
      title:'Informacion de la adivinanza',
      html:
      '<div class=""><br><br>'+
      '<td> Adivinanza: '+this.adivinanza+'</td><br><br>'+
      '<td> pista: '+this.pista+'</td><br><br>'+
      '<td> palabra: '+this.palabra+'</td><br><br>'+
      '</div>'
  })  
  }
  async eleminar(id: any){
    const docRef = doc(this.firebase, 'adivinanza', id); //obtiene la referencia del documento por su id
    await deleteDoc(docRef).then(() =>{
      this.listarAdivinanzas = this.listarAdivinanzas.filter(adi => adi.id !== id);
      this.toastr.success('La adivinanza se elimino correctamente', 'Eliminacion exitosa');
    }, error =>{
      this.toastr.error('El registro no se elimino', 'Error')
    }); //elimina el documento

  }
  borrarLectura(id:any){
    Swal.fire({
      title: '¿Quiere borrar la adivinanza?',
      text: "En este apartado borrara la adivinanza y sus datos en definitiva",
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
    this.adivi.setRegistro;
    this.adivi.setRegistro(id);
    this.router.navigate(['ModificarAdivinanza/'+ this.id ]);
 }
  crearAdivinanza(){
    this.router.navigate(['RegistroAdivinanza/'+ this.id ]);
  }
}
