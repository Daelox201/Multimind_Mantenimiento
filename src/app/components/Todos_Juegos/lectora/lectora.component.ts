import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, addDoc,getDoc, doc,setDoc,collection,collectionData , getFirestore, FirestoreModule, getDocs} from '@angular/fire/firestore';
import Swal from 'sweetalert2';
import { newlectura } from 'src/app/models/newlectura';
@Component({
  selector: 'app-lectora',
  templateUrl: './lectora.component.html',
  styleUrls: ['./lectora.component.css']
})
export class LectoraComponent {


  id: string | null | undefined;
  listarLecturas: newlectura[] = [];
  lectura: string | undefined; 
  titulo: string | undefined; 

  preg1: string | undefined;
  preg2: string | undefined;
  preg3: string | undefined;
  preg4: string | undefined;
  preg5: string | undefined;

  resp1BD: string | undefined;
  resp2BD: string | undefined;
  resp3BD: string | undefined;
  resp4BD: string | undefined;
  resp5BD: string | undefined;

  resp1: string | undefined;
  resp2: string | undefined;
  resp3: string | undefined;
  resp4: string | undefined;
  resp5: string | undefined;
  form:FormGroup;
buenas: number = 0 ;

  respuesta: any[] = [
    {value: 'Verdadero', nombre: 'Verdadero'},
    {value: 'Falso', nombre: 'Falso'}
  ];

  constructor(
    private router: Router,
    private aRouter: ActivatedRoute,
    private fb: FormBuilder,
    private firebase: Firestore){  
      this.form = this.fb.group({
      resp1: ['', [Validators.required]],
      resp2: ['', [Validators.required]],
      resp3: ['', [Validators.required]],
      resp4: ['', [Validators.required]],
      resp5: ['', [Validators.required]],
    })}
    

 ngOnInit(): void{
  this.id = this.aRouter.snapshot.paramMap.get('id');

  this.tabla();
 }  
respuestas(){
this.resp1 = this.form.value.resp1;
this.resp2 = this.form.value.resp2;
this.resp3 = this.form.value.resp3;
this.resp4 = this.form.value.resp4;
this.resp5 = this.form.value.resp5;


  if( this.resp1BD === this.resp1){
    this.buenas++;
   } if( this.resp2BD === this.resp2){
     this.buenas++;
    }
    if( this.resp3BD === this.resp3){
     this.buenas++;
    }
    if( this.resp4BD === this.resp4){
     this.buenas++;
    }
    if( this.resp5BD === this.resp5){
     this.buenas++;
    }
console.log(this.buenas);
Swal.fire({
  title:'Resultados',
  showCancelButton: false,
  confirmButtonText: 'Jugar de nuevo', 
  showDenyButton: true,
  confirmButtonColor: 'green',
  denyButtonText: `Regresar`,
  html:
  '<div class=""><br>'+
  '<td><h1 style="font-size: 30px;">'+this.buenas+' / 5</h1> '+''+'</td><br>'+
  '<td>  <div class="col-lg-12 text-center"><div class="progress" role="progressbar" aria-label="Info example" aria-valuenow="5" aria-valuemin="0" aria-valuemax="100"><div class="progress-bar" style="width: '+this.buenas * 10 * 2+'%">'+this.buenas +'</div></div><br></div>'+''+'</td><br><br>'+
  '</div>'


}).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
    window.location.reload();
  }
  else if (result.isDenied) {
    this.router.navigate(['LogicoVerbal/'+ this.id +'']);
  }
})
}





 async tabla(){
  this.listarLecturas = [];
  const colRef = collection(this.firebase, 'lectura');//buscamos la colección en la base de datos
  const querySnapshot = await getDocs(colRef);
  const cantidadDocumentos = querySnapshot.size;

  if (cantidadDocumentos > 0) {
    // Generar un número aleatorio entre 0 y cantidadDocumentos - 1
    const indiceAleatorio = Math.floor(Math.random() * cantidadDocumentos);
    
    // Obtener el documento en el índice aleatorio
    let contador = 0;

    querySnapshot.forEach((doc) => {
      if (contador === indiceAleatorio) {

        this.lectura = doc.data()['lectura'];
        this.titulo = doc.data()['titulo']; 
        this.preg1 = doc.data()['preg1'];
        this.preg2 = doc.data()['preg2'];
        this.preg3 = doc.data()['preg3'];
        this.preg4 = doc.data()['preg4'];
        this.preg5 = doc.data()['preg5'];

        this.resp1BD = doc.data()['resp1'];
        this.resp2BD = doc.data()['resp2'];
        this.resp3BD = doc.data()['resp3'];
        this.resp4BD = doc.data()['resp4'];
        this.resp5BD = doc.data()['resp5'];


      }
      contador++;
    });
  } else {

  }
}


}