import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminlogService } from 'src/app/services/adminlog.service';
import { MaestrosService } from 'src/app/services/maestros.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  
    constructor(private adminlogService: AdminlogService,
      private toastr: ToastrService,
      private _maestrosService: MaestrosService,
      private router: Router,){}
  
   ngOnInit(): void{
    this._maestrosService.getDocente().subscribe(data =>{
      //console.log(data);
    });
   }
directivo(){
  this.router.navigate(['/logestudiante']);
}
   
   salir(){
    this.adminlogService.logout().then(()=>{ 
      this.toastr.success('Saliste de la ssesión', 'Hasta luego');
      this.router.navigate(['/inicio']);
     }).catch(error =>{
       this.toastr.error('No tiene permitido el acceso', 'Error')
       console.log(error);   
       })
   }
  
  
  }
  
   
   
   
  