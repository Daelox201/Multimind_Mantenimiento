import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {
  id: string | null | undefined;
  constructor(
    private router: Router,
    private aRouter: ActivatedRoute,
    ){  }
   ngOnInit(){
      this.id = this.aRouter.snapshot.paramMap.get('id');
  }
  preguntas(){
    this.router.navigate(['preguntas/'+ this.id ]);
  }
}


