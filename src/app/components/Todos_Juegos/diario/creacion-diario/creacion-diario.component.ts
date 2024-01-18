import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, collection, doc, getDoc, getDocs } from '@angular/fire/firestore';
import Swal from 'sweetalert2';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { newdiario } from 'src/app/models/newdiario';
import { DiarioService } from 'src/app/services/diario.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-creacion-diario',
  templateUrl: './creacion-diario.component.html',
  providers: [DatePipe],
  styleUrls: ['./creacion-diario.component.css']
})
export class CreacionDiarioComponent {
  id: string | null | undefined;
  form:FormGroup;
  fechaActual: Date | undefined;
  selectEmocion = '';
  fechaHoy: string | null ;
  fechaHoy2:  string ="";
  emociones: any[] = [
    {value: 'Alegría', nombre: 'Alegría'},
    {value: 'Tristeza', nombre: 'Tristeza'},
    {value: 'Miedo', nombre: 'Miedo'},
    {value: 'Ira', nombre: 'Ira'},
    {value: 'Sorpresa', nombre: 'Sorpresa'},
    {value: 'Disgusto', nombre: 'Disgusto'},
    {value: 'Culpa', nombre: 'Culpa'},
    {value: 'Vergüenza', nombre: 'Vergüenza'},
    {value: 'Gratitud', nombre: 'Gratitud'},
    {value: 'Envidia', nombre: 'Envidia'},
    {value: 'Amor', nombre: 'Amor'},
    {value: 'Odio', nombre: 'Odio'},
    {value: 'Orgullo', nombre: 'Orgullo'},
    {value: 'Ansiedad', nombre: 'Ansiedad'},
    {value: 'Culpabilidad', nombre: 'Culpabilidad'},
    {value: 'Aburrimiento', nombre: 'Aburrimiento'},
  ];

  constructor(
    private aRouter: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private auth: AngularFireAuth,
    private firebase: Firestore,
    private newDiario: DiarioService,
    private datePipe: DatePipe
     ){
      this.fechaActual = new Date();
      this.fechaHoy = this.datePipe.transform(this.fechaActual, 'dd/MM/yyyy');
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(35)]],
      emocion: ['', [Validators.required]],
      descripcion: ['', [Validators.required, Validators.maxLength(1300)]]
    })
  }

  ngOnInit() {
    this.id = this.aRouter.snapshot.paramMap.get('id');

  }
  crear(){

    const diario: newdiario = {
      idDiario: this.id || undefined,
      fecha: this.fechaHoy || 'Fecha no disponible',
      titulo: this.form.value.titulo,
      sentimiento: this.form.value.emocion,
      descripcion: this.form.value.descripcion
    };
        this.newDiario.registro(diario).then( (user)=>{
          diario.id = user.id;
          this.newDiario.doc(diario);
        });
        this.toastr.success('El registro fue exitoso', 'Registro completado');
        this.router.navigate(['Diario/'+ this.id ]);

   }

}
