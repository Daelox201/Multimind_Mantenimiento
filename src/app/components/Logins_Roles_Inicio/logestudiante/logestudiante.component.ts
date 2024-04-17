import { Component } from '@angular/core'; // Importa el decorador Component desde Angular Core
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importa AngularFireAuth para la autenticación de Firebase
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa FormBuilder y Validators para construir formularios reactivos
import { Router } from '@angular/router'; // Importa Router para la navegación entre componentes
import { Firestore, addDoc, getDoc, doc, setDoc, collection, collectionData, getFirestore, FirestoreModule } from '@angular/fire/firestore'; // Importa Firestore y sus métodos para interactuar con la base de datos de Firebase
import { ToastrService } from 'ngx-toastr'; // Importa ToastrService para mostrar notificaciones
import { AdminlogService } from 'src/app/services/adminlog.service'; // Importa AdminlogService para la lógica de inicio de sesión de administradores
import { AuthService } from 'src/app/services/auth.service'; // Importa AuthService para la lógica de inicio de sesión
import Swal from 'sweetalert2'; // Importa SweetAlert2 para mostrar mensajes de alerta
import { getDocs, query, where } from 'firebase/firestore';


@Component({ // Decorador Component para definir el componente
  selector: 'app-logestudiante', // Selector del componente
  templateUrl: './logestudiante.component.html', // Ruta del archivo HTML de la plantilla del componente
  styleUrls: ['./logestudiante.component.css'] // Rutas de los archivos CSS para estilos específicos del componente
})
export class LogestudianteComponent { // Clase del componente LogestudianteComponent

  id: string | undefined; // Variable para almacenar el ID del usuario
  forms: FormGroup; // Variable para el formulario reactivo del componente
  loading = false; // Variable para controlar el estado de carga durante el inicio de sesión
  perfil = 'estudiante'; // Variable para almacenar el perfil predeterminado

  constructor(private fb: FormBuilder, // Inyección del FormBuilder para construir formularios reactivos
    private adminlogService: AdminlogService, // Inyección del servicio AdminlogService para la lógica de inicio de sesión de administradores
    private toastr: ToastrService, // Inyección de ToastrService para mostrar notificaciones
    private router: Router, // Inyección de Router para la navegación entre componentes
    private auth: AngularFireAuth, // Inyección de AngularFireAuth para la autenticación de Firebase
    private authService: AuthService, // Inyección de AuthService para la lógica de inicio de sesión
    private firebase: Firestore // Inyección de Firestore para interactuar con la base de datos de Firebase
    ){

      this.forms = this.fb.group({ // Inicialización del formulario reactivo con FormBuilder
        email: ['', Validators.required], // Campo de correo electrónico con validación requerida
        password: ['', [Validators.required]] // Campo de contraseña con validación requerida
      })
 }

 ngOnInit(): void{ // Método del ciclo de vida que se ejecuta después de que Angular muestra los datos por primera vez

 }

 modal(){ // Función para mostrar un modal de SweetAlert en caso de error de inicio de sesión
  Swal.fire({
    icon: 'error',
    title: 'Acceso denegado',
    text: 'Revise si todos los datos son correctos',
  })
 }

 async login() { // Marca la función login() como asíncrona
  const email = this.forms.value.email; // Obtener el valor del campo de correo electrónico del formulario
  const password = this.forms.value.password; // Obtener el valor del campo de contraseña del formulario

  // Realizar la consulta para encontrar el documento del usuario por correo electrónico
  const alumnoCollectionRef = collection(this.firebase, 'alumno');
  const querySnapshot = await getDocs(query(alumnoCollectionRef, where("correo", "==", email)));

  if (!querySnapshot.empty) { // Verificar si se encontraron documentos con el correo electrónico proporcionado
    querySnapshot.forEach(async (docSnap) => {
      const data = docSnap.data(); // Obtener los datos del documento del usuario
      const perfil = data['perfil']; // Obtener el perfil del usuario
      const nombre = data['nombre']; // Obtener el nombre del usuario
      const apellidoPaterno = data['apellidoPaterno']; // Obtener el apellido paterno del usuario
      const activo = data['activo']; // Obtener el estado de activación del usuario
      const psw = data['contraseña'];
      this.id = data['id']; // Obtener el ID del usuario

      // Verificar si la contraseña proporcionada coincide con la contraseña almacenada en el documento
      if (password === psw) {
        // Validar el perfil y el estado de activación del usuario
        if (perfil === 'Estudiante' && activo === 'activo') {
          // Intentar iniciar sesión utilizando el servicio de autenticación
          if (this.authService.login(perfil, activo)) {
            this.toastr.success('Inicio de sesión correcto', 'Bienvenido ' + nombre + ' ' + apellidoPaterno);
            this.router.navigate(['/principalEstudiante/' + this.id]); // Redirigir al usuario a la página principal de estudiante
          }
        } else {
          this.modal(); // Mostrar un modal de SweetAlert en caso de error de inicio de sesión
        }
      } else {
        this.modal(); // Mostrar un modal de SweetAlert si la contraseña es incorrecta
      }
    });
  } else {
    this.modal(); // Mostrar un modal de SweetAlert si no se encontró ningún usuario con el correo electrónico proporcionado
  }
}


contra(){ // Función para redirigir al usuario a la página de recuperación de contraseña
  this.router.navigate(['/registerestudiante/']);
}



}
