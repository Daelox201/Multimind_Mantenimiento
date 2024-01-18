import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
@Component({
  selector: 'app-inteligencias',
  templateUrl: './inteligencias.component.html',
  styleUrls: ['./inteligencias.component.css']
})
export class InteligenciasComponent {


  id: string | null | undefined;

   
  constructor(
    private router: Router,
    private aRouter: ActivatedRoute){}

 ngOnInit(): void{
  this.id = this.aRouter.snapshot.paramMap.get('id');
 }
 contras(){
  this.router.navigate(['contra/'+ this.id]);
}
mate(){
  this.router.navigate(['/LogicoMatematico/'+ this.id]);
}
musical(){
  this.router.navigate(['/Musical/'+ this.id]);
}
intra(){
  this.router.navigate(['/Intra/'+ this.id]);
}
inter(){
  this.router.navigate(['/Inter/'+ this.id]);
}
  verbal(){
    this.router.navigate(['/LogicoVerbal/'+ this.id]);
  }
  corporal(){
    this.router.navigate(['/Corporal/'+ this.id]);
  }
  espacial(){
    this.router.navigate(['/Espacial/'+ this.id]);
  }
  alumno(){
      this.router.navigate(['/lista/'+ this.id]);
  }
}

