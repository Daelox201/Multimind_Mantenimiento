import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adivinanza',
  templateUrl: './adivinanza.component.html',
  styleUrls: ['./adivinanza.component.css']
})
export class AdivinanzaComponent implements OnInit {
  forms: FormGroup;
  adivinanza: string | undefined;
  respuesta: string = "";
  pista: string = "";
  colors: string = "grey";
  letra: string = "";
  mensaje: string = "";
  id: string | null | undefined;
  contador_mala: number = 8;
  contadorPregunta: number = 0;
  contadorRespuestasCorrectas: number = 0;
  documentos: any[] = []; // Almacena los documentos aleatorios

  constructor(
    private fb: FormBuilder,
    private aRouter: ActivatedRoute,
    private router: Router,
    private firebase: Firestore,
  ) {
    this.forms = this.fb.group({
      resp: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]]
    });
  }

  ngOnInit() {
    this.id = this.aRouter.snapshot.paramMap.get('id');
    this.tabla();
  }

  async tabla() {
    const colRef = collection(this.firebase, 'adivinanza');
    const querySnapshot = await getDocs(colRef);
    const cantidadDocumentos = querySnapshot.size;

    if (this.contador_mala === 0) {
      Swal.fire({
        title: 'Termino el  juego',
        showCancelButton: false,
        confirmButtonText: 'Jugar de nuevo',
        showDenyButton: true,
        confirmButtonColor: 'green',
        denyButtonText: `Regresar`,
        backdrop: `
        rgba(16, 233, 16 ,0.3)
        left top
        no-repeat
      `,
        html:
          '<div class=""><br>' +
          '<td><h1 style="font-size: 20px;">' + "Obtuviste la puntuación de:  " + this.contadorRespuestasCorrectas + ' adivinanzas correctas</td><br>' +
          '</div>'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        } else if (result.isDenied) {
          this.router.navigate(['LogicoVerbal/' + this.id + '']);
        } else {
          window.location.reload();
        }
      });
    }

    if (cantidadDocumentos > 0) {
      // Si aún no se han obtenido documentos aleatorios, obtén todos y mézclalos
      if (this.documentos.length === 0) {
        querySnapshot.forEach(doc => {
          this.documentos.push(doc.data());
        });
        this.shuffleArray(this.documentos);
      }

      // Verifica que haya documentos restantes antes de mostrar la adivinanza
      if (this.contadorPregunta < this.documentos.length) {
        
        const doc = this.documentos[this.contadorPregunta];
        this.adivinanza = doc['adivinanza'];
        this.respuesta = doc['palabra'];
        this.pista = doc['pista'];
        this.colors = "grey";
      } else {
        // Aquí puedes manejar el caso cuando ya no hay más adivinanzas
        console.log('No hay más adivinanzas');
      }
    }
  }

  ayuda() {
    Swal.fire({
      title: 'Pista',
      showCancelButton: false,
      confirmButtonText: 'Ok',
      showDenyButton: false,
      confirmButtonColor: 'blue',
      html: '<div class=""><br>' +
        '<td><h1 style="font-size: 20px;">' + this.pista + '</td><br>' +
        '</div>'
    });
  }

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  async check() {
    if (this.forms.value.resp === this.respuesta) {
      this.contadorRespuestasCorrectas++;
      this.mensaje = "";
      this.contadorPregunta++; // Avanzar solo si la respuesta es correcta
      this.respuesta = ""; // Limpiar la respuesta después de la respuesta correcta
      this.pista = ""; // Limpiar la pista después de la respuesta correcta
      this.colors = "green"
    } else {
      this.colors="red";
      this.contador_mala--;
      this.mensaje = "Intenta con otra respuesta";
    }

    this.letra = "";
    this.tabla();
  }
}
