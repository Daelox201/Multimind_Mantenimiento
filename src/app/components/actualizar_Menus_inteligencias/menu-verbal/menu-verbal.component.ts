import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu-verbal',
  templateUrl: './menu-verbal.component.html',
  styleUrls: ['./menu-verbal.component.css']
})
export class MenuVerbalComponent {
  id: string | null | undefined;

  constructor(
    private router: Router,
    private aRouter: ActivatedRoute){}

 ngOnInit(): void{
  this.id = this.aRouter.snapshot.paramMap.get('id');
 }
 lectura(){
  this.router.navigate(['listaLecturas/'+ this.id]);
 }
 adivinanza(){
  this.router.navigate(['tablaAdivinanza/'+ this.id]);
 }
}