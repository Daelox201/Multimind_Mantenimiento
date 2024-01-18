import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu-corporal',
  templateUrl: './menu-corporal.component.html',
  styleUrls: ['./menu-corporal.component.css']
})
export class MenuCorporalComponent {
  id: string | null | undefined;

  constructor(
    private router: Router,
    private aRouter: ActivatedRoute){}

 ngOnInit(): void{
  this.id = this.aRouter.snapshot.paramMap.get('id');
 }
 baile(){
  this.router.navigate(['tablaKinestesica/'+ this.id]);
}

}