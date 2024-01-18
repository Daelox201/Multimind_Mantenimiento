import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css']
})
export class PuzzleComponent {

  id: string | null | undefined;
  id1: number | undefined;
  image: string | undefined;
  position: number | undefined;
  correctPosition: boolean | undefined; 

  constructor(
    private aRouter: ActivatedRoute,){}
  puzzlePieces = [
    { id1: 1, image: './assets/friends.png', position: 1, correctPosition: false },
    { id1: 2, image: './assets/balance.png', position: 2, correctPosition: false },
    { id1: 3, image: './assets/descarga.png', position: 4, correctPosition: false },
    { id1: 4, image: './assets/empresario.png', position: 3, correctPosition: false },
    { id1: 5, image: './assets/espacio.png', position: 6, correctPosition: false },
    { id1: 6, image: './assets/apple.png', position: 5, correctPosition: false },
    // Agrega más piezas aquí
  ];
  ngOnInit(): void{
    this.id = this.aRouter.snapshot.paramMap.get('id');
   }  

   onDragStart(event: DragEvent, piece: any) {
    event.dataTransfer?.setData('text/plain', piece.id1.toString());
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();




  }

  onDrop(event: DragEvent, targetPiece: any) {
    event.preventDefault();
    const pieceId = event.dataTransfer?.getData('text/plain');
    if (pieceId) {
      const droppedPiece = this.puzzlePieces.find(piece => piece.id1.toString() === pieceId);
      if (droppedPiece && !targetPiece.correctPosition) {
        // Intercambiar las posiciones de las piezas
        const tempPosition = targetPiece.position;
        targetPiece.position = droppedPiece.position;
        droppedPiece.position = tempPosition;
        

        this.checkIfPuzzleCompleted();
      }
    }
  }

  checkIfPuzzleCompleted() {
    const allPiecesCorrect = this.puzzlePieces.every(piece => piece.correctPosition);
    if (allPiecesCorrect) {
      alert('¡Rompecabezas completado!');
    }
  }
}