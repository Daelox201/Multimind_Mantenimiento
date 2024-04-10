
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { dir } from 'src/app/models/dir';
import { DirectivosService } from 'src/app/services/directivos.service';


@Component({
  selector: 'app-newdirectivo',
  templateUrl: './newdirectivo.component.html',
  styleUrls: ['./newdirectivo.component.css']
})
export class NewdirectivoComponent {
  id: string | null | undefined;
  form:FormGroup;
  loading = false;
  selectCarrera = '';

  carreras: any[] = [
    {value: 'Ing. Software', nombre: 'Ing Software'},
    {value: 'Ing. Redes', nombre: 'Ing Redes'}
  ];
  constructor(private fb: FormBuilder,
     private toastr: ToastrService,
     private aRouter: ActivatedRoute,
     private router: Router,
     private _directivo: DirectivosService){


  this.form = this.fb.group({
    Nombre: ['', [Validators.required,Validators.maxLength(25), Validators.pattern(/^[a-zA-Z\s]*$/)]],
    ApellidoPaterno: ['', [Validators.required,Validators.maxLength(25), Validators.pattern(/^[a-zA-Z\s]*$/)]],
    ApellidoMaterno: ['', [Validators.required,Validators.maxLength(25), Validators.pattern(/^[a-zA-Z\s]*$/)]],
    carrera: ['',Validators.required],
    cargo: ['',[Validators.required,Validators.maxLength(30), Validators.pattern(/^[a-zA-Z\s]*$/)]],
     Username: ['', [Validators.required,Validators.maxLength(35), Validators.email]],
    Matricula: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(10), Validators.maxLength(10)]] ,
  })

  }

  ngOnInit(): void{
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }
     crear(){

    const directivo: dir = {

      nombre: this.form.value.Nombre,
      apellidoPaterno: this.form.value.ApellidoPaterno,
      apellidoMaterno: this.form.value.ApellidoMaterno,
      carrera: this.form.value.carrera,
      cargo: this.form.value.cargo,
      correo: this.form.value.Username,
      matricula: this.form.value.Matricula,
      psw: 'upp1234',
      perfil: 'directivo',
      activo: 'success',
    }
  
    this._directivo.crearDirectivo(directivo).then(()=>{
    
      directivo.id = this._directivo.getId(directivo)?.uid;
     // this._alumnoService.datosAlumno(alumno);
     this._directivo.doc(directivo);
     this.loading = false;

     this.toastr.success('El registro fue exitoso', 'Registro completado');
     this.router.navigate(['listaDirectivo/'+ this.id ]);
    }, error =>{
      this.loading = false;
      this.toastr.error('Oppps.... ocurrio un error', 'Error')
      console.log(error);
        })
  }


  }

