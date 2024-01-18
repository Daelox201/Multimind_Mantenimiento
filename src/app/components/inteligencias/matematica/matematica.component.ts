import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-matematica',
  templateUrl: './matematica.component.html',
  styleUrls: ['./matematica.component.css']
})
export class MatematicaComponent {
    id: string | null | undefined;
    constructor(
      private router: Router,
      private aRouter: ActivatedRoute){}
  
   ngOnInit(): void{
    this.id = this.aRouter.snapshot.paramMap.get('id');
   }  

snake(){


  Swal.fire({
    title:'Instrucciones del juego',
    showCancelButton: true,
    confirmButtonText: 'Jugar', 
    confirmButtonColor: 'green',
    html:
    '<div class=""><br>'+
    '<td> Controles: '+''+'</td><br>'+
    '<td> <img src="./assets/teclas.jpg"class="imgEstudiante2"  style="width: 22rem; height: 17rem;"> '+''+'</td><br><br>'+
    '<td> Para reiniciar el juego debe presionar la tecla espacio:'+''+'</td><br><br>'+
    '<td> <img src="./assets/espacio.png"class="imgEstudiante2"  style="width: 22rem; height: 15rem;"> '+''+'</td><br><br>'+
    '</div>'
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      this.router.navigate(['snake/'+ this.id ]);
    }
  })
}
 adivina(){
  Swal.fire({
    title:'Instrucciones del juego',
    showCancelButton: true,
    confirmButtonText: 'Jugar', 
    confirmButtonColor: 'green',
    html:
    '<div class=""><br>'+
    '<td> La computadora pensara un numero del 1 al 100 la cual el objetivo que tu trates de adivinar el numero en el menor de intentos posibles. '+''+'</td><br>'+
    '</div>'
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      this.router.navigate(['adivina/'+ this.id ]);
    }
  })
 }

  }
  
  