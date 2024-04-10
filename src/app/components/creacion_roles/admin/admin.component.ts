import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminlogService } from 'src/app/services/adminlog.service';
import { ToastrService } from 'ngx-toastr';
import { admin } from 'src/app/models/admin';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  forms:FormGroup;


  id: string | null | undefined;


  constructor(private fb: FormBuilder,
    private adminlogService: AdminlogService,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
    ){

 this.forms = new FormGroup({
  email: new FormControl(),
  password: new FormControl(),
 })
 }

 ngOnInit(): void{
  this.id = this.aRouter.snapshot.paramMap.get('id');
 }
 crear(){

  const admin: admin = {

    correo: this.forms.value.email,
    psw: this.forms.value.password,
    perfil: 'Admin',
  }
  this.adminlogService.crearAdmin(admin).then(()=>{
    
    admin.id = this.adminlogService.getId(admin)?.uid;
   // this._alumnoService.datosAlumno(alumno);
   this.adminlogService.doc(admin);
   //this.loading = false;

   this.toastr.success('El registro fue exitoso', 'Registro completado');
  }, error =>{
   //this.loading = false;
    this.toastr.error('Oppps.... ocurrio un error', 'Error')
    console.log(error);
      })
}
 }
 

 
