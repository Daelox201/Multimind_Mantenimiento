import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-adivina',
  templateUrl: './adivina.component.html',
  styleUrls: ['./adivina.component.css']
})
export class AdivinaComponent {
  numeroSecreto: number = 0;
  suposicion: number = 0;
  id: string | null | undefined;
  
  forms:FormGroup;
  ganaste: boolean = false;
  intentos: number = 0;
  mensaje: string = "";

  constructor(private fb: FormBuilder,
    private router: Router,
    private aRouter: ActivatedRoute,
    ){

      this.forms = this.fb.group({
        numeros:  ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(1), Validators.maxLength(3), this.validarNumeroNoMayorDe100]]
      })
 }

  ngOnInit(): void {
    this.id = this.aRouter.snapshot.paramMap.get('id');
    this.numeroSecreto = Math.floor(Math.random() * 100) + 1;
    console.log(this.numeroSecreto);
    this.intentos = 0;
    this.mensaje = "";
  }
  validarNumeroNoMayorDe100(control: AbstractControl) {
    const numero = parseInt(control.value, 10);

    if (!isNaN(numero) && numero > 100) {
      return { mayorDe100: true }; // Devuelve un error si el número es mayor de 100
    }

    return null; // Válido si el número es menor o igual a 100
  }
  verificarSuposicion(): void {
    this.intentos++;

    if (this.forms.value.numeros < this.numeroSecreto) {
      this.mensaje = "Más alto. Intenta de nuevo.";
    } else if (this.forms.value.numeros > this.numeroSecreto) {
      this.mensaje = "Más bajo. Intenta de nuevo.";
    } else {
      this.ganaste = true;
      this.mensaje = `¡Felicidades, adivinaste el número en ${this.intentos} intentos!`;
      Swal.fire({
        title:'Felicidades, adivinaste el número',
        showCancelButton: false,
        confirmButtonText: 'Jugar de nuevo', 
        showDenyButton: true,
        confirmButtonColor: 'green',
        denyButtonText: `Regresar`,
        html:
        '<div class=""><br>'+
        '<td><h1 style="font-size: 20px;">'+ "El número fue adivinado en " +this.intentos +" " +'intentos' + '</td><br>'+
        
        '</div>'
      
      
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          window.location.reload();
        }
        else if (result.isDenied) {
          this.router.navigate(['LogicoMatematico/'+ this.id +'']);
        }else{
          window.location.reload();
        }
  
      })
    }

    this.suposicion = 0; // Limpia el valor de la suposición
  }
  reiniciar() {
    window.location.reload();
  }


}
