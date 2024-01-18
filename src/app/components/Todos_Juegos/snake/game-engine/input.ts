export class UserKeyInput {
    inputDirection = { x: 0, y: 0 };
    lastInputDirection = { x: 0, y: 0 };
  
  
    getInputs() {
      window.addEventListener('keydown', e => {
        this.setDirection(e.key);
      })
    }
  
    setDirection(direction: String) {
      switch (direction) {
        case 'w':
          if (this.lastInputDirection.y !== 0) break;
          this.inputDirection = { x: 0, y: -1 };
          break;
        case 's':
          if (this.lastInputDirection.y !== 0) break;
          this.inputDirection = { x: 0, y: 1 };
          break;
        case 'a':
          if (this.lastInputDirection.x !== 0) break;
          this.inputDirection = { x: -1, y: 0 };
          break;
        case 'd':
          if (this.lastInputDirection.x !== 0) break;
          this.inputDirection = { x: 1, y: 0 };
          break;
          case ' ':   
            window.location.reload();
            break;
      }
    }
  
    getInputDirection() {
      this.lastInputDirection = this.inputDirection;
      return this.inputDirection;
    }
  
  }