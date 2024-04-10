import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-corporal',
  templateUrl: './corporal.component.html',
  styleUrls: ['./corporal.component.css']
})
export class CorporalComponent {
  id: string | null | undefined;
  constructor(
    private router: Router,
    private aRouter: ActivatedRoute){}

 ngOnInit(): void{
  this.id = this.aRouter.snapshot.paramMap.get('id');
 }  
korporal(){
  Swal.fire({
    title:'Instrucciones del juego',
    showCancelButton: true,
    confirmButtonText: 'Jugar', 
    confirmButtonColor: 'green',
    html:
    '<div class=""><br>'+
    '<td>Se te mostrara un video la cual tendras que hacer lo que dice el video. '+''+'</td><br>'+
    '</div>'
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      this.router.navigate(['baile/'+ this.id ]);
    }
  })
}
 
}


