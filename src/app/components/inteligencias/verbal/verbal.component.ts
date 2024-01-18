import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verbal',
  templateUrl: './verbal.component.html',
  styleUrls: ['./verbal.component.css']
})
export class VerbalComponent   {
    id: string | null | undefined;
    constructor(
      private router: Router,
      private aRouter: ActivatedRoute){}
  
   ngOnInit(): void{
    this.id = this.aRouter.snapshot.paramMap.get('id');
   }  
   lectura(){
    this.router.navigate(['comprensionLectora/'+ this.id]);
   }
   adivinanza(){
    this.router.navigate(['adivinanza/'+this.id]);
   }
   
  }
  
  
