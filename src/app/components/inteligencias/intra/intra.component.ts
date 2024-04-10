import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-intra',
  templateUrl: './intra.component.html',
  styleUrls: ['./intra.component.css']
})
export class IntraComponent {
  id: string | null | undefined;
  constructor(
    private router: Router,
    private aRouter: ActivatedRoute){}

 ngOnInit(): void{
  this.id = this.aRouter.snapshot.paramMap.get('id');
 }  

 intra(){
  Swal.fire({
    title:'Instrucciones del tu diario',
    showCancelButton: true,
    confirmButtonText: 'Empezar', 
    confirmButtonColor: 'green',
    html:
    '<div class=""><br>'+
    '<td> Solo tu podras ver tu diario, el objetivo es que puedas reflejar tus sentimientos, ideas, aventuras, etc. A travez de un diario, que tiene como objetivo tu autoreflexion '+''+'</td><br>'+
    '</div>'
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      this.router.navigate(['Diario/'+ this.id ]);
    }
  })
 }
 
}