import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-piano',
  templateUrl: './piano.component.html',
  styleUrls: ['./piano.component.css']
})
export class PianoComponent {
  title = 'Piano';
  numeroAleatorio: number = 0;
  numeroAleatorio2: number = 0;
  numeroAleatorio3: number = 0;
  buenas: number = 0;
  toques: number = 1;
  intento: number = 0;
  id: string | null | undefined;
  constructor(
    private router: Router,
    private aRouter: ActivatedRoute){}

 ngOnInit(): void{
  this.id = this.aRouter.snapshot.paramMap.get('id');
 }
  aplicarSonido(numero: number): void {

    const audio = new Audio();
    audio.src = '../assets/sonidos/note' + numero + '.wav';

    if(this.intento == 1){

if(this.toques <= 3){
  if(this.toques == 1){
  if(numero === this.numeroAleatorio){
    this.buenas = this.buenas + 1;
  } 
}
if(this.toques == 2){
  if((numero === this.numeroAleatorio2) ){
    this.buenas = this.buenas + 1;
  }
}
if(this.toques == 3){
  if(numero === this.numeroAleatorio3){
    this.buenas = this.buenas + 1;
  }
}
  console.log("buena: "+ this.buenas);
}
if(this.toques == 3){
  Swal.fire({
    title:'Resultados',
    showCancelButton: true,
    confirmButtonText: 'Jugar de nuevo', 
    showDenyButton: true,
    confirmButtonColor: 'green',
    denyButtonText: `Regresar`,
    html:
    '<div class=""><br>'+
    '<td><h1 style="font-size: 30px;">'+this.buenas+' / 3</h1> '+''+'</td><br>'+
    '<td>  <div class="col-lg-12 text-center"><div class="progress" role="progressbar" aria-label="Info example" aria-valuenow="3" aria-valuemin="0" aria-valuemax="100"><div class="progress-bar" style="width: '+this.buenas * 10 * 3.5+'%">'+this.buenas +'</div></div><br></div>'+''+'</td><br><br>'+
    '</div>'
  
  
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      window.location.reload();
    }
    else if (result.isDenied) {
      this.router.navigate(['Musical/'+ this.id +'']);
    }
this.toques = 1;
this.intento = 0;
this.buenas = 0;
  })
}
this.toques++;
}
    console.log("toque: "+this.toques);
    audio.load();
    audio.play();
  
  }

 
  aleatoreo(): void {
    // Reproduce tres tonos aleatorios
    for (let i = 0; i < 1; i++) {
      this.numeroAleatorio = Math.floor(Math.random() * 7) + 1; // Números aleatorios entre 1 y 7

      const audio = new Audio();
      audio.src = '../assets/sonidos/note' + this.numeroAleatorio + '.wav';
      console.log(this.numeroAleatorio);
      audio.load();
      audio.play();

      setTimeout(() => {
        this.numeroAleatorio2 = Math.floor(Math.random() * 7) + 1; // Números aleatorios entre 1 y 7
        const audio2 = new Audio();
        audio2.src = '../assets/sonidos/note' + this.numeroAleatorio2 + '.wav';
        console.log(this.numeroAleatorio2);
        audio2.load();
        audio2.play();
      }, 1000);
      setTimeout(() => {
        this.numeroAleatorio3 = Math.floor(Math.random() * 7) + 1; // Números aleatorios entre 1 y 7
        const audio2 = new Audio();
        audio2.src = '../assets/sonidos/note' + this.numeroAleatorio3 + '.wav';
        console.log(this.numeroAleatorio3);
        audio2.load();
        audio2.play();
      }, 2000);
    }
  }
}
