import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, addDoc,getDoc, doc,setDoc,collection,collectionData , getFirestore, FirestoreModule} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-principalestudiante',
  templateUrl: './principalestudiante.component.html',
  styleUrls: ['./principalestudiante.component.css']
})
export class PrincipalestudianteComponent {
  IL: number =0;
  ILM: number=0; 
  IVE:number  =0;
  IKC: number=0 ;
  IM:number =0;
  IITRA: number =0;
  IINTER: number=0;
  intento: number = 0 ;
  test: boolean = false;
  correo: string  | null = "";
  id: string | null | undefined;
  constructor(
    private aRouter: ActivatedRoute,
    private router: Router,
    private auth: AngularFireAuth,
    private toastr: ToastrService,
    private firebase: Firestore){}

 async ngOnInit(): Promise<void>{
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
      if(dato2['test'] == 'danger'){
        this.test = false;
      }if(dato2['test'] == 'success'){
        this.test = true;
      }
}
 }
forta(){
  this.router.navigate(['fortalecimiento/'+ this.id]);
}
  
  testMultiple(){
    Swal.fire({
      title: '¿Quiere realizar el test?',
      text: "Solo tendra una oportunidad para realizar este test, si desea nuevamente realizarlo, su tutor debe habilitarlo",
      icon: 'question',
      iconColor: 'info',
      showCancelButton: true,
      confirmButtonText: 'Empezar', 
      confirmButtonColor: 'green ',
  
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.router.navigate(['preguntas/'+ this.id ]);
      }
    })
  }
  resultados(){
    this.router.navigate(['/resultados/'+ this.id]);

}
contras2(){
  Swal.fire({
    title: '¿Quiere cambiar su contraseña?',
    text: "Se le enviara un correo electronico donde podra cambiar la contraseña multimind",
    icon: 'question',
    iconColor: 'blue',
    showCancelButton: true,
    confirmButtonText: 'Enviar', 
    confirmButtonColor: 'Blue ',

  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      this.auth.currentUser.then(user => {
        if (user) {
          this.correo = user.email;
          if(this.correo){
          this.auth.sendPasswordResetEmail(this.correo).then(() =>{
          this.toastr.success('Verificar el correo', 'Se envio un correo electronico ');//damos bienvenida 
          }).catch((error) =>{
            this.toastr.error('Se produjo un problema', 'No se envio el correo para el restablecimiento de contraseña ');
          });
        }
        }else{
          this.toastr.error('Se produjo un problema', 'No se encontro al usuario ');
        }
      }).catch(error => {
      });

    }
  })

}
}
