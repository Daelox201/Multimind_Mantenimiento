import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Firestore, addDoc,getDoc, doc,setDoc,collection,collectionData , getFirestore, FirestoreModule} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { AdminlogService } from 'src/app/services/adminlog.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logestudiante',
  templateUrl: './logestudiante.component.html',
  styleUrls: ['./logestudiante.component.css']
})
export class LogestudianteComponent {

  id: string | undefined;
  forms:FormGroup;
  loading = false;
  perfil = 'estudiante';

  constructor(private fb: FormBuilder,
    private adminlogService: AdminlogService,
    private toastr: ToastrService,
    private router: Router,
    private auth: AngularFireAuth,
    private authService: AuthService,
    private firebase: Firestore
    ){

      this.forms = this.fb.group({
        email: ['',Validators.required],
        password: ['',[Validators.required]]
    
      })
 }

 ngOnInit(): void{


 }
 modal(){
  Swal.fire({
    icon: 'error',
    title: 'Acceso denegado',
    text: 'Revise si todos los datos son correctos',
  })
 }

 login(){
const email = this.forms.value.email;
const password = this.forms.value.password;

this.adminlogService.login(this.forms.value).then(response=>{ //validando el formulario
  this.loading = false;
  this.loading = true;
  this.auth.currentUser.then(async user => {//validando id de susuario
    if (user && user.uid){//si existe el usuario 
      
      const placeRef = doc(this.firebase, 'alumno', user.uid );//buscamos el usuario en la base de datos
      const docSnap = await getDoc(placeRef);
      if(docSnap.exists()){//si existe buscamos el perfil
        const data = docSnap.data();
        const perfil = data['perfil'];//sacamos el perfil de la base de datos
        const nombre = data['nombre'];
        const apellidoPaterno = data['apellidoPaterno'];
        const activo = data['activo'];
        this.id = data['id'];
        if(perfil == 'estudiante'){//comprobar si es estudiante
          if (this.authService.login(perfil, activo)){
          this.toastr.success('Inicio se sesión correcto', 'Bienvenido '+nombre+' '+apellidoPaterno);//damos bienvenida 

          this.router.navigate(['/principalEstudiante/'+ this.id]);//si es estudiente prosigue a la siguiente pagina
        }
      }
        } else {  
          this.modal();
          this.loading = false;
        }
    }else{
      this.loading = false;
    }
    this.loading = false;
  })
 }).catch(error =>{
  this.loading = true;
  this.modal();
   this.loading = false;
   })
   this.loading = false;
}

contra(){
  this.router.navigate(['/recuperar/']);//si es estudiente prosigue a la siguiente pagina
}

}

 
 
 

