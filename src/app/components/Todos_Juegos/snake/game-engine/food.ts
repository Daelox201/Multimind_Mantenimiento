import { randomGridPosition } from './gameboard-grid.util';

export class Food {
  EXPANSION_RATE = 1;
  score = 0;
  food: any;
  snake;
  constructor(snake: any) {
    this.snake = snake;
    this.food = this.getRandomFoodPosition();
  }

  update() {
    if (this.snake.onSnake(this.food)) {
      this.snake.expandSnake(this.EXPANSION_RATE);
      this.food = this.getRandomFoodPosition();
      this.addScore = 1;
    }
  }

  draw(gameBoard: any) {
    const foodElement = document.createElement('div');
    const foodImage = document.createElement('img');
    
    foodElement.style.gridRowStart = this.food.y;
    foodElement.style.gridColumnStart = this.food.x;
    foodElement.classList.add('food');
    foodElement.style.transition = 'all .3ms ease-in';
    foodElement.style.border = '0.0vmin solid black';
    
    foodImage.src = '/assets/apple.png'; // Reemplaza con la ruta real de la imagen
    foodImage.alt = 'Apple';
    foodImage.style.width = '100%'; // Ajusta el tamaño de la imagen
    
    foodElement.appendChild(foodImage); // Agregar la imagen al elemento de comida
    gameBoard.appendChild(foodElement);
  }


  getRandomFoodPosition() {
    let newFoodPosition;
    while (newFoodPosition == null || this.snake.onSnake(newFoodPosition)) {
      newFoodPosition = randomGridPosition()
    }
    return newFoodPosition;
  }

  set addScore(val: number) {
    this.score+=val;
  }

  get currentScore() {
    return this.score;
  }
}