import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, addDoc,getDoc, doc,setDoc,collection,collectionData , getFirestore, FirestoreModule, getDocs, deleteDoc} from '@angular/fire/firestore';
import { PreguntasService } from 'src/app/services/preguntas.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent {

  id: string | null | undefined;
  IL: number =0;
  ILM: number=0; 
  IVE:number  =0;
  IKC: number=0 ;
  IM:number =0;
  IITRA: number =0;
  IINTER: number=0;
  intento: number = 0 ;

  color: string = 'danger';
  color2: string = 'danger';
  color3: string = 'danger';
  color4: string = 'danger';
  color5: string = 'danger';
  color6: string = 'danger';
  color7: string = 'danger';

  constructor(
    private router: Router,
    public preguntaService: PreguntasService,
    private aRouter: ActivatedRoute,
    private firebase: Firestore
    ){  }
  
      async ngOnInit(){

        this.id = this.aRouter.snapshot.paramMap.get('id');
        const place2 = doc(this.firebase, 'alumno/'+ this.id );
        const snap2 = await getDoc(place2);
        if(snap2.exists()){//si existe buscamos el perfil
          const dato2 = snap2.data();
          this.intento = dato2['intentos'];
            this.IL= dato2['IL'] ;
            this.ILM=  dato2['ILM'] ;
            this.IVE=  dato2['IVE'] ;
            this.IKC=  dato2['IKC'] ;
            this.IM= dato2['IM'] ;
            this.IITRA=  dato2['IITRA'] ;
            this.IINTER= dato2['IINTER'] ;
    }

    switch(this.IL){
      case 5:{
        this.color = 'success';break;
      }case 4:{
        this.color = 'success';break;
      }case 3:{
        this.color = 'warning';break;
      }
    }

    switch(this.ILM){
      case 5:{
        this.color2 = 'success';break;
      }case 4:{
        this.color2 = 'success';break;
      }case 3:{
        this.color2 = 'warning';break;
      }
    }

    switch(this.IVE){
      case 5:{
        this.color3 = 'success';break;
      }case 4:{
        this.color3 = 'success';break;
      }case 3:{
        this.color3 = 'warning';break;
      }
    }

    switch(this.IKC){
      case 5:{
        this.color4 = 'success';break;
      }case 4:{
        this.color4 = 'success';break;
      }case 3:{
        this.color4 = 'warning';break;
      }
    }

    switch(this.IM){
      case 5:{
        this.color5 = 'success';break;
      }case 4:{
        this.color5 = 'success';break;
      }case 3:{
        this.color5 = 'warning';break;
      }
    }

    switch(this.IINTER){
      case 5:{
        this.color6 = 'success';break;
      }case 4:{
        this.color6 = 'success';break;
      }case 3:{
        this.color6 = 'warning';break;
      }
    }

    switch(this.IITRA){
      case 5:{
        this.color7 = 'success';break;
      }case 4:{
        this.color7 = 'success';break;
      }case 3:{
        this.color7 = 'warning';break;
      }
    }
    
      }

      repetir(){
        this.router.navigate(['testMultiple/'+ this.id ]);
      }

      casa (){
        this.router.navigate(['principalEstudiante/'+ this.id ]);
      }
    }
