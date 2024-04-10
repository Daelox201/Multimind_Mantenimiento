import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.css'],
})
export class SudokuComponent {
  sudokuData: number[] = [
  0, 2, 8, 9, 3, 6, 4, 7, 5,
  7, 9, 5, 6, 4, 8, 1, 3, 2,
  3, 6, 4, 7, 5, 2, 6, 8, 9,
  5, 3, 7, 1, 4, 9, 2, 6, 8,
  9, 8, 2, 5, 6, 1, 3, 4, 7,
  4, 1, 6, 8, 7, 3, 5, 9, 1,
  6, 5, 9, 4, 2, 7, 8, 1, 3,
  8, 4, 1, 3, 9, 5, 7, 2, 6,
  2, 7, 3, 4, 1, 8, 9, 5, 4
  ];
  solvedSudoku: number[][] = [];
  isSudokuSolved: boolean = false;

  constructor(private sudokuSolverService: ApiService) {}

  solveSudoku(): void {
    const options = {
      method: 'POST',
      url: 'https://sudoku-solver3.p.rapidapi.com/sudokusolver/',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'be01b3cad2msha6e779bba3d1c54p18646djsn22bb19bb75ae',
        'X-RapidAPI-Host': 'sudoku-solver3.p.rapidapi.com'
      },
      data: {
        input: this.sudokuData
      }
    };

    this.sudokuSolverService.solveSudoku(options).subscribe(
      (response: any) => {
        this.solvedSudoku = this.convertTo2DArray(response.solution);
        this.isSudokuSolved = true; // Activar el mensaje de éxito
      },
      (error) => {
        console.error(error);
      }
    );
  }

  convertTo2DArray(arr: number[]): number[][] {
    const newArr: number[][] = [];
    for (let i = 0; i < arr.length; i += 9) {
      newArr.push(arr.slice(i, i + 9));
    }
    return newArr;
  }
}