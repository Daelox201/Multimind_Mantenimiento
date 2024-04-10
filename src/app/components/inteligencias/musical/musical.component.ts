import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-musical',
  templateUrl: './musical.component.html',
  styleUrls: ['./musical.component.css']
})
export class MusicalComponent {
  id: string | null | undefined;
  constructor(
    private router: Router,
    private aRouter: ActivatedRoute){}

 ngOnInit(): void{
  this.id = this.aRouter.snapshot.paramMap.get('id');
 }  
 piano(){
  Swal.fire({
    title:'Instrucciones del juego',
    showCancelButton: true,
    confirmButtonText: 'Jugar', 
    confirmButtonColor: 'green',
    html:
    '<div class=""><br>'+
    '<td>Se mostrará un piano con notas musicales de Do-Re-Mi-Fa-Sol-La-Si. Cuando presiones el botón, la computadora reproducirá al azar notas musicales que tú tendrás que replicar en el piano.'+''+'</td><br>'+
    '</div>'
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      this.router.navigate(['piano/'+ this.id]);
    }
  })

 }
 karaoke(){
  Swal.fire({
    title:'Instrucciones del juego',
    showCancelButton: true,
    confirmButtonText: 'Jugar', 
    confirmButtonColor: 'green',
    html:
    '<div class=""><br>'+
    '<td>Canta con toda tu fuerza.'+''+'</td><br>'+
    '</div>'
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {

      this.router.navigate(['karaoke/'+ this.id]);
    }
  })

 }
}
