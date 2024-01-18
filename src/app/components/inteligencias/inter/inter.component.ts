import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-inter',
  templateUrl: './inter.component.html',
  styleUrls: ['./inter.component.css']
})
export class InterComponent {
  id: string | null | undefined;
  constructor(
    private router: Router,
    private aRouter: ActivatedRoute){}

 ngOnInit(): void{
  this.id = this.aRouter.snapshot.paramMap.get('id');
 }  

 palabra(){
  Swal.fire({
    title:'Instrucciones del juego',
    showCancelButton: true,
    confirmButtonText: 'Jugar', 
    confirmButtonColor: 'green',
    html:
    '<div class=""><br>'+
    '<td> la computadora pensara en una palabra la cual tendras como maximo 8 intentoss para encontrarla '+''+'</td><br>'+
    '</div>'
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      this.router.navigate(['palabra/'+ this.id ]);
    }
  })
 }
 inter(){
  Swal.fire({
    title:'Instrucciones del juego',
    showCancelButton: true,
    confirmButtonText: 'Jugar',  
    confirmButtonColor: 'green',
    html:
    '<div class=""><br>'+
    '<td> trata de responder todas las preguntas como se posible '+''+'</td><br>'+
    '</div>'
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      this.router.navigate(['preguntados/'+ this.id ]);
    }
  })
 }
 
}
