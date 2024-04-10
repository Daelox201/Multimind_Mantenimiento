
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { mast } from 'src/app/models/mast';
import { MaestrosService } from 'src/app/services/maestros.service';

@Component({
  selector: 'app-newmaestro',
  templateUrl: './newmaestro.component.html',
  styleUrls: ['./newmaestro.component.css']
})
export class NewmaestroComponent {
  form:FormGroup;
  loading = false;
  id: string | null | undefined;
  selectTiempo = '';
  
  titulo = 'Registrar Maestro';

  tiempo: any[] = [
    {value: 'Tiempo Completo', nombre: 'Tiempo Completo'},
    {value: 'Medio Tiempo', nombre: 'Medio Tiempo'}
  ];
  selectCarrera = '';

  carreras: any[] = [
    {value: 'Ing. Software', nombre: 'Ing Software'},
    {value: 'Ing. Redes', nombre: 'Ing Redes'}
  ];


  constructor(private fb: FormBuilder,
     private toastr: ToastrService,
     private aRouter: ActivatedRoute,
     private router: Router,
     private _maestrosService: MaestrosService){


  this.form = this.fb.group({
    tiempo: ['',Validators.required],
    Nombre: ['', [Validators.required, Validators.maxLength(25), Validators.pattern(/^[a-zA-Z\s]*$/)]],
    ApellidoPaterno: ['', [Validators.required, Validators.maxLength(25), Validators.pattern(/^[a-zA-Z\s]*$/)]],
    ApellidoMaterno: ['', [Validators.required, Validators.maxLength(25), Validators.pattern(/^[a-zA-Z\s]*$/)]],
    carrera: ['',Validators.required],
    Matricula: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(10), Validators.maxLength(10)]] ,
    Username: ['', [Validators.required,Validators.maxLength(35), Validators.email]],


  })

  }

  ngOnInit():void{
    this.id = this.aRouter.snapshot.paramMap.get('id');
    this._maestrosService.getDocente().subscribe(data =>{
      this.form.patchValue({
        Nombre: data['nombre'],
        ApellidoPaterno: data.apellidoPaterno,
        ApellidoMaterno: data.apellidoMaterno,
        carrera: data.carrera,
        tiempo: data.tiempo,
        Username: data.correo,
        Matricula: data.matricula,
      })
      console.log(data['nombre']);
      this.titulo = 'Editar Maestro';
    })

  }



     crear(){
      
   
    const maestro: mast = {

      nombre: this.form.value.Nombre,
      apellidoPaterno: this.form.value.ApellidoPaterno,
      apellidoMaterno: this.form.value.ApellidoMaterno,
      carrera: this.form.value.carrera,
      tiempo: this.form.value.tiempo,
      correo: this.form.value.Username,
      matricula: this.form.value.Matricula,
      perfil: 'docente',
      psw: 'upp1234',
      activo: 'success',
    }
  
    this._maestrosService.crearMaestro(maestro).then(()=>{
    
      maestro.id = this._maestrosService.getId(maestro)?.uid;
     this._maestrosService.doc(maestro);
     this.loading = false;
    
     this.toastr.success('El registro fue exitoso', 'Registro completado');
     this.router.navigate(['listaDocente/'+ this.id ]);
    }, error =>{
      this.loading = false;
      this.toastr.error('Oppps.... ocurrio un error', 'Error')
      console.log(error);
        })
  }


  }
