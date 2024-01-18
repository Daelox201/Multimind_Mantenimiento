import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-memorama',
  templateUrl: './memorama.component.html',
  styleUrls: ['./memorama.component.css']
})
export class MemoramaComponent implements OnInit {
  cards = [
    { id: 1, imageUrl: 'assets/cards/card1.jpg', isFlipped: false },
    { id: 2, imageUrl: 'assets/cards/card2.jpg', isFlipped: false }
  ];

  flippedCards = [];
  matchedCards = [];

  ngOnInit() {
    this.shuffleCards();
  }

  shuffleCards() {
    this.cards = this.cards.sort(() => Math.random() - 0.5);
  }

  flipCard(card: { isFlipped: boolean; }) {
    if (this.flippedCards.length === 2 || card.isFlipped) {
      return;
    }

    card.isFlipped = true;
    this.flippedCards.push(card);

    if (this.flippedCards.length === 2) {
      setTimeout(() => {
        this.checkMatch();
      }, 1000);
    }
  }

  checkMatch() {
    if (this.flippedCards[0].id === this.flippedCards[1].id) {
      this.matchedCards.push(...this.flippedCards);
    } else {
      this.flippedCards.forEach(card => card.isFlipped = false);
    }
    this.flippedCards = [];
  }

  get isGameOver() {
    return this.cards.length === this.matchedCards.length;
  }
}
