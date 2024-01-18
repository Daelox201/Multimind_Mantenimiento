import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent {
  id: string | null | undefined;

   
  constructor(
    private router: Router,
    private aRouter: ActivatedRoute){}

    ngOnInit(): void{
      this.id = this.aRouter.snapshot.paramMap.get('id');
     }
    
     linguistica(){
      this.router.navigate(['MenuVerbal/'+ this.id]);
    }
    corporal(){
      this.router.navigate(['MenuKinestesica/'+ this.id]);
    }
    intra(){
      this.router.navigate(['MenuIntrapersonal/'+ this.id]);
    }
    interpersonal(){
      this.router.navigate(['MenuInterpersonal/'+ this.id]);
    }
    musical(){
      this.router.navigate(['MenuMusical/'+ this.id]);
    }
}
