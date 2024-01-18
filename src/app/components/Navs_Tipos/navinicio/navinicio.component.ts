import { Component } from '@angular/core';

import { AlumnoService } from 'src/app/services/alumno.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AdminlogService } from 'src/app/services/adminlog.service';
import { MaestrosService } from 'src/app/services/maestros.service';
@Component({
  selector: 'app-navinicio',
  templateUrl: './navinicio.component.html',
  styleUrls: ['./navinicio.component.css']
})
export class NavinicioComponent {
  constructor(private fb: FormBuilder,
    private adminlogService: AdminlogService,
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private _maestrosService: MaestrosService,
    private auth: AngularFireAuth,

    private AlumnoService: AlumnoService
    ){}
 ngOnInit(){


}


menu(){
  this.router.navigate(['/inicio/']);
}
}




