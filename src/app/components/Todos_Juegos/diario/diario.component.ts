import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Firestore, addDoc,getDoc, doc,setDoc,collection,collectionData , getFirestore, FirestoreModule, getDocs, deleteDoc} from '@angular/fire/firestore';
import { newdiario } from 'src/app/models/newdiario';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-diario',
  templateUrl: './diario.component.html',
  styleUrls: ['./diario.component.css']
})
export class DiarioComponent {
  id: string | null | undefined;
  listarDiarios: newdiario[] = [];
  forms:FormGroup;
  selectFecha :string = 'Todos';
  constructor(
    private aRouter: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private firebase: Firestore,
  ) {        this.forms = this.fb.group({

  })}

  async ngOnInit() {
    this.id = this.aRouter.snapshot.paramMap.get('id');
  
    const colRef = collection(this.firebase, 'diario');//buscamos la colección en la base de datos
    const querySnapshot = await getDocs(colRef);

    querySnapshot.forEach((doc: any) => {//iteramos sobre cada documento
    const data = doc.data();

    if(data['idDiario'] === this.id){
  this.listarDiarios.push({
  
    id: doc.data['id'],
    ...doc.data()
  })}
    });
    this.listarDiarios.sort((a, b) => {

      
      return a.fecha.localeCompare(b.fecha);
      }); 
    
  }
  refresh(): void {
    this.ngOnInit();
    }
  
  newDiario(){
    this.router.navigate(['newDiario/'+ this.id ]);
  }

  async borrar(id: any){
    console.log(id);
    const docRef = doc(this.firebase, 'diario', id); //obtiene la referencia del documento por su id
    await deleteDoc(docRef).then(() =>{
      this.listarDiarios = this.listarDiarios.filter(diario => diario.id !== id);
      this.toastr.success('El video se elimino correctamente', 'Eliminacion exitosa');
    }, error =>{
      this.toastr.error('El registro no se elimino', 'Error')
    }); //elimina el documento
   }

   borrarLectura(id:any){
    Swal.fire({
      title: '¿Quiere borrar esta pagina?',
      text: "Si lo eliminas no habra forma de recuperar la informacion",
      icon: 'warning',
      iconColor: 'red',
      showCancelButton: true,
      confirmButtonText: 'Borrar', 
      confirmButtonColor: 'red ',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.borrar(id);
       
      
      }
    })
  }
}
