import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-espacial',
  templateUrl: './espacial.component.html',
  styleUrls: ['./espacial.component.css']
})
export class EspacialComponent {
  id: string | null | undefined;
  constructor(
    private router: Router,
    private aRouter: ActivatedRoute){}

 ngOnInit(): void{
  this.id = this.aRouter.snapshot.paramMap.get('id');
 }  
 memorama(){
  Swal.fire({
    title:'Instrucciones del juego',
    showCancelButton: true,
    confirmButtonText: 'Jugar', 
    confirmButtonColor: 'green',
    html:
    '<div class=""><br>'+
    '<td>Se mostraran cartas tapadas o ocultas, la cual tu labor es encontrar los pares con un maximo de intentos '+''+'</td><br>'+
    '</div>'
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      this.router.navigate(['/memorama/'+ this.id]);
    }
  })

}


 
}


