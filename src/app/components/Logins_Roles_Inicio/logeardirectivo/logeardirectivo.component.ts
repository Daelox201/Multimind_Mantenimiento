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
  selector: 'app-logeardirectivo',
  templateUrl: './logeardirectivo.component.html',
  styleUrls: ['./logeardirectivo.component.css']
})
export class LogeardirectivoComponent {
  forms:FormGroup;
  loading = false;
  perfil = 'docente';
  id: string | undefined;
  constructor(private fb: FormBuilder,
    private adminlogService: AdminlogService,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService,
    private auth: AngularFireAuth,

    private firebase: Firestore
    ){
      this.forms = this.fb.group({
        email: ['',Validators.required],
        password: ['',Validators.required]
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
  this.auth.currentUser.then(async users => {//validando id de susuario
    if (users && users.uid){//si existe el usuario 

      const placeRef = doc(this.firebase, 'directivo', users.uid );//buscamos el usuario en la base de datos
      const placeRef2 = doc(this.firebase, 'Admin', users.uid );//buscamos el usuario en la base de datos
 
      const docSnap = await getDoc(placeRef);
      const docSnap2 = await getDoc(placeRef2);
      if(docSnap.exists()){//si existe buscamos el perfil
        const data = docSnap.data();
        
        this.id = data['id'];
        const perfil = data['perfil'];//sacamos el perfil de la base de datos
        const nombre = data['nombre'];
        const activo = data['activo'];
        if(perfil == 'directivo'){//comprobar si es estudiante
          if (this.authService.login(perfil, activo)){
          this.toastr.success('Inicio de sesión correcto', 'Bienvenido '+nombre);//damos bienvenida 
          this.router.navigate(['/principalDirector/'+this.id+'']);//si es estudiente prosigue a la siguiente pagina
        }
      }
        } if(docSnap2.exists()){//si existe buscamos el perfil
          const data = docSnap2.data();
          this.id = data['id']
          const perfil = data['perfil'];//sacamos el perfil de la base de datos
          const activo = data['activo'];
          if(perfil == 'Admin'){//comprobar si es estudiante
            if (this.authService.login(perfil, activo)){
            this.toastr.success('Inicio de sesión correcto', 'Bienvenido Administrador');//damos bienvenida 
            this.router.navigate(['/principalAdmin/'+this.id+'']);//si es estudiente prosigue a la siguiente pagina
            
            }
          }
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

 
 
 



