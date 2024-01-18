import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu-interpersonal',
  templateUrl: './menu-interpersonal.component.html',
  styleUrls: ['./menu-interpersonal.component.css']
})
export class MenuInterpersonalComponent {
  id: string | null | undefined;

  constructor(
    private router: Router,
    private aRouter: ActivatedRoute){}

 ngOnInit(): void{
  this.id = this.aRouter.snapshot.paramMap.get('id');
 }
 pregunta(){
  this.router.navigate(['tablaPreguntas/'+ this.id]);
}
palabra(){
  this.router.navigate(['/tablaPalabra/'+ this.id]);
}
}

