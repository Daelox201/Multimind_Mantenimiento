import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu-musical',
  templateUrl: './menu-musical.component.html',
  styleUrls: ['./menu-musical.component.css']
})
export class MenuMusicalComponent {
  id: string | null | undefined;

  constructor(
    private router: Router,
    private aRouter: ActivatedRoute){}

 ngOnInit(): void{
  this.id = this.aRouter.snapshot.paramMap.get('id');
 }
 tablakaraoke(){
  this.router.navigate(['tablaKaraoke/'+ this.id]);
 }
}
