import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {
  pregunta: string | undefined;
  buena: string = "";
  mala1: string = "";
  mala2: string = "";
  mala3: string = "";
  id: string | null | undefined;
  contador_mala: number = 5 ;
  shuffledAnswers: string[] = [];
  contadorPregunta: number = 0;
  contadorRespuestasCorrectas: number = 0; // Contador para respuestas correctas
  fechaActual: Date | undefined;
  constructor(
    private aRouter: ActivatedRoute,
    private router: Router,
    private firebase: Firestore,
  ) {}

  ngOnInit() {
    this.id = this.aRouter.snapshot.paramMap.get('id');
    this.tabla();
    this.fechaActual = new Date();
  }

  async tabla() {
    const colRef = collection(this.firebase, 'Pregunta_Interpersonal');
    const querySnapshot = await getDocs(colRef);
    const cantidadDocumentos = querySnapshot.size;
    if(this.contador_mala === 0){
      Swal.fire({
        title:'Termino el  juego',
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
        '<td><h1 style="font-size: 20px;">'+ "Obtubiste la puntuacion de:  " + this.contadorRespuestasCorrectas + ' preguntas correctas</td><br>'+
        
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
    if (cantidadDocumentos > 0) {

      if (this.contadorPregunta <= cantidadDocumentos) {
        const doc = querySnapshot.docs[this.contadorPregunta];
        this.pregunta = doc.data()['pregunta'];
        this.buena = doc.data()['buena'];
        this.mala1 = doc.data()['mala1'];
        this.mala2 = doc.data()['mala2'];
        this.mala3 = doc.data()['mala3'];


        this.shuffledAnswers = [this.buena, this.mala1, this.mala2, this.mala3];
        this.shuffleArray(this.shuffledAnswers);
      }
    }
  }

  shuffleArray(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  async check(respuesta: string | undefined) {
    if (respuesta === this.buena) {
      this.contadorRespuestasCorrectas++;
    }
    if (respuesta !== this.buena) {
      this.contador_mala--;
    }


    this.contadorPregunta++;
    this.tabla();
  }
}
