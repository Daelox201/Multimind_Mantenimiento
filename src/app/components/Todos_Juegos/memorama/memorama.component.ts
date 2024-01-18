// memory.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

// Definimos la interfaz para las cartas
interface Card {
  id: number;
  imageUrl: string;
  isFlipped: boolean;
}

@Component({
  selector: 'app-memorama',
  templateUrl: './memorama.component.html',
  styleUrls: ['./memorama.component.css']
})
export class MemoramaComponent implements OnInit {

  id: string | null | undefined;
  intento: number = 7 ;
  constructor(
    private router: Router,
    private aRouter: ActivatedRoute,) {}
  cards: Card[] = [
    { id: 1, imageUrl: './assets/friends.png', isFlipped: false },
    { id: 2, imageUrl: './assets/friends.png', isFlipped: false },

    { id: 3, imageUrl: './assets/balance.png', isFlipped: false },
    { id: 4, imageUrl: './assets/balance.png', isFlipped: false },

    { id: 5, imageUrl: './assets/rock-n-roll.png', isFlipped: false },
    { id: 6, imageUrl: './assets/rock-n-roll.png', isFlipped: false },

    { id: 7, imageUrl: './assets/music-notes.png', isFlipped: false },
    { id: 8, imageUrl: './assets/music-notes.png', isFlipped: false },

    { id: 9, imageUrl: './assets/calculator.png', isFlipped: false },
    { id: 10, imageUrl: './assets/calculator.png', isFlipped: false },

    { id: 11, imageUrl: './assets/binoculars.png', isFlipped: false },
    { id: 12, imageUrl: './assets/binoculars.png', isFlipped: false },

    { id: 13, imageUrl: './assets/voice-command.png', isFlipped: false },
    { id: 14, imageUrl: './assets/voice-command.png', isFlipped: false },

    { id: 15, imageUrl: './assets/unnamed.png', isFlipped: false },
    { id: 16, imageUrl: './assets/unnamed.png', isFlipped: false },

    { id: 17, imageUrl: './assets/graduado.png', isFlipped: false },
    { id: 18, imageUrl: './assets/graduado.png', isFlipped: false },
    // ... añade más cartas aquí
  ];

  // Inicializamos los arrays para las cartas volteadas y las emparejadas
  flippedCards: Card[] = [];
  matchedCards: Card[] = [];

  // Al iniciar el componente, mezclamos las cartas
  ngOnInit() {
    this.id = this.aRouter.snapshot.paramMap.get('id');
    this.shuffleCards();
  }

  // Función para mezclar las cartas
  shuffleCards() {
    this.cards = this.cards.sort(() => Math.random() - 0.5);
  }

  // Función para voltear una carta
  flipCard(card: Card) {
    // Si ya hay dos cartas volteadas o la carta ya está volteada, no hacemos nada
    if (this.flippedCards.length === 2 || card.isFlipped) {
      return;
    }

    // Volteamos la carta y la añadimos al array de cartas volteadas
    card.isFlipped = true;
    this.flippedCards.push(card);

    // Si hay dos cartas volteadas, comprobamos si son iguales
    if (this.flippedCards.length === 2) {
      setTimeout(() => {
        this.checkMatch();
      }, 1000);
    }
  }

  // Función para comprobar si las dos cartas volteadas son iguales
  checkMatch() {
    // Si las cartas son iguales, las añadimos al array de cartas emparejadas
    if (this.flippedCards[0].imageUrl === this.flippedCards[1].imageUrl) {
      this.matchedCards.push(...this.flippedCards);
    } else {
      this.intento --;
      // Si no son iguales, las volvemos a poner boca abajo
      this.flippedCards.forEach(card => card.isFlipped = false);
    }
    // Vaciamos el array de cartas volteadas
    this.flippedCards = [];

    console.log(this.intento);
    if(this.intento === 0){
      Swal.fire({
        title:'Perdiste, casi lo logras',
        showCancelButton: false,
        confirmButtonText: 'Jugar de nuevo', 
        showDenyButton: true,
        confirmButtonColor: 'green',
        denyButtonText: `Regresar`,
        html:
        '<div class=""><br>'+
        '<td><h1 style="font-size: 20px;">'+ "Llegaste al numero maximo de intentos"+ '</td><br>'+
        '</div>'
      
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          window.location.reload();
        }
        else if (result.isDenied) {
          this.router.navigate(['Espacial/'+ this.id +'']);
        }else{
          window.location.reload();
        }
  
      })
    }

    if(this.cards.length === this.matchedCards.length){
    
    Swal.fire({
      title:'Felicidades, completaste el memorama',
      showCancelButton: false,
      confirmButtonText: 'Jugar de nuevo', 
      showDenyButton: true,
      confirmButtonColor: 'green',
      denyButtonText: `Regresar`,
      html:
      '<div class=""><br>'+
      '<td><h1 style="font-size: 20px;">'+ "El número fue adivinado en " +this.intento +" " +'intentos' + '</td><br>'+
      '</div>'
    
    
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        window.location.reload();
      }
      else if (result.isDenied) {
        this.router.navigate(['Espacial/'+ this.id +'']);
      }else{
        window.location.reload();
      }

    })
  }
    }

  // Función para comprobar si el juego ha terminado (todas las cartas están emparejadas)

  get isGameOver() {
    return this.cards.length === this.matchedCards.length;
  }
}
