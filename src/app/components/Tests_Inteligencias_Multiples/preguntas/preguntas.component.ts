import { Component, OnInit } from '@angular/core';
import { AlumnoService } from 'src/app/services/alumno.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, addDoc,getDoc, doc,setDoc,collection,collectionData , getFirestore, FirestoreModule, getDocs, deleteDoc} from '@angular/fire/firestore';
import { est } from 'src/app/models/est';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { preg } from 'src/app/models/preg';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit{
  listPregunta: preg[] = [];
  numero: number =0 ;
  id: string | null | undefined;
  band: boolean = false;

  verbal: number = 0;

  constructor(
    private router: Router,
    public preguntaService: PreguntasService,
    private aRouter: ActivatedRoute,
    private firebase: Firestore,
    private AlumnoService: AlumnoService
    ){  }
  
      ngOnInit(){
   
      this.id = this.aRouter.snapshot.paramMap.get('id');
      this.listPregunta = this.preguntaService.getPreguntas();
      this.regresar();
     
    }

    Pregunta(){
      return this.listPregunta[this.preguntaService.index].descripcion;
    }

    async verdadero(){

      
      if(this.listPregunta[this.preguntaService.index].respuesta[0].correcta  == 'verbal'){
        this.preguntaService.verb++;
        //console.log(this.listPregunta[this.preguntaService.index].respuesta[0].correcta);        
      }
      if(this.listPregunta[this.preguntaService.index].respuesta[0].correcta  == 'musica'){
        this.preguntaService.musica++;
       // console.log(this.listPregunta[this.preguntaService.index].respuesta[0].correcta);        
      }
      if(this.listPregunta[this.preguntaService.index].respuesta[0].correcta  == 'visual'){
        this.preguntaService.visual++;
       // console.log(this.listPregunta[this.preguntaService.index].respuesta[0].correcta);        
      }
      if(this.listPregunta[this.preguntaService.index].respuesta[0].correcta  == 'intra'){
        this.preguntaService.intra++;
       // console.log(this.listPregunta[this.preguntaService.index].respuesta[0].correcta);        
      }
      if(this.listPregunta[this.preguntaService.index].respuesta[0].correcta  == 'inter'){
        this.preguntaService.inter++;
        //console.log(this.listPregunta[this.preguntaService.index].respuesta[0].correcta);        
      }
      if(this.listPregunta[this.preguntaService.index].respuesta[0].correcta  == 'mate'){
        this.preguntaService.mate++;
       // console.log(this.listPregunta[this.preguntaService.index].respuesta[0].correcta);        
      }
      if(this.listPregunta[this.preguntaService.index].respuesta[0].correcta  == 'corporal'){
        this.preguntaService.corporal++;
       
       // console.log(this.listPregunta[this.preguntaService.index].respuesta[0].correcta);        
      } 
              this.preguntaService.index ++;
              if( this.preguntaService.index === 35 ){
      const place2 = doc(this.firebase, 'alumno/'+ this.id );
      const snap2 = await getDoc(place2);
      if(snap2.exists()){//si existe buscamos el perfil
        const dato2 = snap2.data();

        const alumno: est = {
          id: dato2['id'],
          nombre: dato2['nombre'],
          apellidoPaterno: dato2['apellidoPaterno'],
          apellidoMaterno: dato2['apellidoMaterno'],
          correo: dato2['correo'],
          matricula: dato2['matricula'],
          carrera: dato2['carrera'],
          tutor:  dato2['tutor'],      
          psw: 'upp1234',
          perfil: 'estudiante',
          test: 'danger',
          activo: dato2['activo'],
          IL: this.preguntaService.verb,
           ILM:  this.preguntaService.mate,
          IVE:  this.preguntaService.visual,
          IKC:  this.preguntaService.corporal,
          IM: this.preguntaService.musica,
          IITRA:  this.preguntaService.intra,
          IINTER: this.preguntaService.inter,
          intentos: dato2['intentos'] + 1,
        }
      
        this.AlumnoService.doc(alumno).then(()=>{

        }, error =>{

              })
        }
                this.router.navigate(['resultados/'+ this.id ]);
                this.preguntaService.index = 0;
                this.preguntaService.verb = 0;
                this.preguntaService.musica = 0;
                this.preguntaService.visual = 0;
                this.preguntaService.intra = 0;
                this.preguntaService.inter = 0;
                this.preguntaService.mate = 0;
                this.preguntaService.corporal = 0;
              }
    }




    async falso(){
      this.preguntaService.index ++ ;
      this.numero++;
      if( this.preguntaService.index === 35 ){
        const place2 = doc(this.firebase, 'alumno/'+ this.id );
const snap2 = await getDoc(place2);
if(snap2.exists()){//si existe buscamos el perfil
const dato2 = snap2.data();

const alumno: est = {
  id: dato2['id'],
  nombre: dato2['nombre'],
  apellidoPaterno: dato2['apellidoPaterno'],
  apellidoMaterno: dato2['apellidoMaterno'],
  correo: dato2['correo'],
  matricula: dato2['matricula'],
  carrera: dato2['carrera'],
  tutor:  dato2['tutor'],      
  psw: 'upp1234',
  perfil: 'estudiante',
  test: 'danger',
  activo: dato2['activo'],
  IL: this.preguntaService.verb,
  ILM:  this.preguntaService.mate,
  IVE:  this.preguntaService.visual,
  IKC:  this.preguntaService.corporal,
  IM: this.preguntaService.musica,
  IITRA:  this.preguntaService.intra,
  IINTER: this.preguntaService.inter,
  intentos: dato2['intentos'] + 1,
}

this.AlumnoService.doc(alumno).then(()=>{

}, error =>{

      })
}
        this.router.navigate(['resultados/'+ this.id ]);
        this.preguntaService.index = 0;
        this.preguntaService.verb = 0;
        this.preguntaService.musica = 0;
        this.preguntaService.visual = 0;
        this.preguntaService.intra = 0;
        this.preguntaService.inter = 0;
        this.preguntaService.mate = 0;
        this.preguntaService.corporal = 0;
      }
    }

    async regresar (){
      
    }
    
  
  }

