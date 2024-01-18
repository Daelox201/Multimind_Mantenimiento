import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, addDoc,getDoc, doc,setDoc,collection,collectionData , getFirestore, FirestoreModule, getDocs} from '@angular/fire/firestore';
import Swal from 'sweetalert2';
import { newpalabra } from 'src/app/models/newpalabra';

@Component({
  selector: 'app-palabra',
  templateUrl: './palabra.component.html',
  styleUrls: ['./palabra.component.css']
})
export class PalabraComponent {
  palabraSecreta: string ;
  letrasAdivinadas: string[] = [];
  intentos: number = 7;

  palabraMostrada: string = '';
  mensaje: string = '';
  letra: string = '';

  forms:FormGroup;
  id: string | null | undefined;
  listarPalabra: newpalabra[] = [];
  palabrabd:string ='';
  
  constructor(private fb: FormBuilder,
    private router: Router,
    private firebase: Firestore,
    private aRouter: ActivatedRoute,) {
    this.forms = this.fb.group({
      letra:  ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/), Validators.minLength(1), Validators.maxLength(1)]]
    })
    this.palabraSecreta = this.palabrabd;
    this.palabraMostrada = this.mostrarPalabraOculta(this.palabraSecreta, this.letrasAdivinadas);
  }
  
   ngOnInit(){
    this.id = this.aRouter.snapshot.paramMap.get('id');
    this.PalabraFire();
  }
  async PalabraFire() {
    this.listarPalabra = [];
    const colRef = collection(this.firebase, 'palabra');
    const querySnapshot = await getDocs(colRef);
    const cantidadDocumentos = querySnapshot.size;
    if (cantidadDocumentos > 0) {
      const indiceAleatorio = Math.floor(Math.random() * cantidadDocumentos);
      let contador = 0;
      querySnapshot.forEach((doc) => {
        if (contador === indiceAleatorio) {
          this.palabraSecreta = doc.data()['palabra']; // Establecer la palabra secreta
        }
        contador++;
      });
      this.palabraMostrada = this.mostrarPalabraOculta(this.palabraSecreta, this.letrasAdivinadas);
    }
  }
  seleccionarPalabra(): string {
    const palabras = this.palabrabd;
    const indiceAleatorio = Math.floor(Math.random() * palabras.length);
    return palabras[indiceAleatorio];
  }
  mostrarPalabraOculta(palabra: string, letrasAdivinadas: string[]): string {
    let palabraMostrada = '';
    for (const letra of palabra) {
      if (letrasAdivinadas.includes(letra)) {
        palabraMostrada += letra;
      } else {
        palabraMostrada += ' _ ';
      }
    }
    return palabraMostrada;
  }
  

  adivinarLetra(): void {
    const letra = this.letra.toLowerCase(); // Convertir la letra ingresada a minúsculas
    if (this.letrasAdivinadas.map(letra => letra.toLowerCase()).includes(letra)) {
      this.mensaje = 'Ya adivinaste esa letra.';
      return;
    }
    if (this.palabraSecreta.includes(letra)) {
      this.letrasAdivinadas.push(letra);
      this.mensaje = '¡Bien hecho! Esa letra está en la palabra.';
    } else {
      this.intentos--;
      this.mensaje = `Incorrecto. Te quedan ${this.intentos} intentos.`;
    }
    
    this.palabraMostrada = this.mostrarPalabraOculta(this.palabraSecreta, this.letrasAdivinadas);
    if (this.palabraMostrada === this.palabraSecreta) {
      this.mensaje = `¡Felicidades! Has adivinado la palabra secreta: ${this.palabraSecreta}`;
      Swal.fire({
        title:'Felicidades Ganaste',
        showCancelButton: false,
        confirmButtonText: 'Jugar de nuevo', 
        showDenyButton: true,
        confirmButtonColor: 'green',
        denyButtonText: `Regresar`,
        backdrop: `
        rgba(16, 233, 16 ,0.3)
        left top
        no-repeat
      `,
        html:
        '<div class=""><br>'+
        '<td><h1 style="font-size: 20px;">'+ "adivinaste la palabra secreta:  " + this.palabraSecreta + '</td><br>'+
        
        '</div>'
      
      
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          window.location.reload();
        }
        else if (result.isDenied) {
          this.router.navigate(['Inter/'+ this.id +'']);
        }else{
          window.location.reload();
        }
  
      })
    }

    if (this.intentos === 0) {
      this.mensaje = `Se acabaron los intentos. La palabra secreta era: ${this.palabraSecreta}`;

      Swal.fire({
        title:'Se acabaron los intentos :(',
        showCancelButton: false,
        confirmButtonText: 'Jugar de nuevo', 
        showDenyButton: true,
        confirmButtonColor: 'green',
        denyButtonText: `Regresar`,
        backdrop: `
        rgba(233, 16, 16 ,0.3)
        left top
        no-repeat
      `,
        html:
        '<div class=""><br>'+
        '<td><h1 style="font-size: 20px;">'+ "La palabra era: " + this.palabraSecreta + '</td><br>'+
        
        '</div>'
      
      
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          window.location.reload();
        }
        else if (result.isDenied) {
          this.router.navigate(['Inter/'+ this.id +'']);
        }else{
          window.location.reload();
        }
        window.location.reload();
      })
    }

    this.letra = '';
  }
}
