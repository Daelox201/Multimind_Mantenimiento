import { Injectable } from '@angular/core';
import { preg } from '../models/preg';
import { resp } from '../models/resp';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {
  index = 0;
  verb = 0;
  mate = 0;
  visual = 0;
  intra = 0;
  inter = 0;
  musica = 0;
  corporal = 0;

  public preguntas: preg[] = [
    new preg('Prefiero hacer un mapa que explicarle a alguien como tiene que llegar', [//1
      new resp('Verdadero', 'visual'),
      new resp('Falso', '')
    ]),
    new preg('Si estoy enojado(a) o contento (a) generalmente sé exactamente por qué', [//2
      new resp('Verdadero','intra'),
      new resp('Falso', ''),
    ]),
    new preg('Sé tocar (o antes sabía tocar) un instrumento musical', [//3
      new resp('Verdadero', 'musica'),
      new resp('Falso', ''),
    ]),
    new preg('Asocio la música con mis estados de ánimo', [//4
      new resp('Verdadero', 'musica'),
      new resp('Falso', ''),
    ]),
    new preg('Puedo sumar o multiplicar mentalmente con mucha rapidez', [//5
      new resp('Verdadero', 'mate'),
      new resp('Falso', ''),
    ]),
    new preg('Puedo ayudar a un amigo a manejar sus sentimientos porque yo lo pude hacer antes en relación a sentimientos parecidos', [//6
      new resp('Verdadero', 'intra'),
      new resp('Falso', ''),
    ]),
    new preg('Me gusta trabajar con calculadoras y computadores', [//7
      new resp('Verdadero', 'mate'),
      new resp('Falso', ''),
    ]),
    new preg('Aprendo rápido a bailar un ritmo nuevo', [//8
      new resp('Verdadero', 'corporal'),
      new resp('Falso', ''),
    ]),
    new preg('No me es difícil decir lo que pienso en el curso de una discusión o debate', [//9
      new resp('Verdadero', 'verbal'),
      new resp('Falso', ''),
    ]),
    new preg('Disfruto de una buena charla, discurso o sermón', [//10
      new resp('Verdadero', 'verbal'),
      new resp('Falso', ''),
    ]),
    new preg('Siempre distingo el norte del sur, esté donde esté', [//11
      new resp('Verdadero', 'visual'),
      new resp('Falso', ''),
    ]),
    new preg('Me gusta reunir grupos de personas en una fiesta o en un evento especial', [//12
      new resp('Verdadero', 'inter'),
      new resp('Falso', ''),
    ]),
    new preg('La vida me parece vacía sin música', [//13
      new resp('Verdadero', 'musica'),
      new resp('Falso', ''),
    ]),
    new preg('Siempre entiendo los gráficos que vienen en las instrucciones de equipos o instrumentos', [//14
      new resp('Verdadero', 'visual'),
      new resp('Falso', ''),
    ]),
    new preg('Me gusta hacer rompecabezas y entretenerme con juegos electrónicos', [//15
      new resp('Verdadero', 'mate'),
      new resp('Falso', ''),
    ]),
    new preg('Me fue fácil aprender a andar en bicicleta. ( o patines)', [//16
      new resp('Verdadero', 'corporal'),
      new resp('Falso', ''),
    ]),
    new preg('Me enojo cuando oigo una discusión o una afirmación que parece ilógica', [//17
      new resp('Verdadero', 'verbal'),
      new resp('Falso', ''),
    ]),
    new preg('Soy capaz de convencer a otros que sigan mis planes', [//18
      new resp('Verdadero', 'inter'),
      new resp('Falso', ''),
    ]),
    new preg('Tengo buen sentido de equilibrio y coordinación', [//19
      new resp('Verdadero', 'corporal'),
      new resp('Falso', ''),
    ]),
    new preg('Con frecuencia veo configuraciones y relaciones entre números con más rapidez y facilidad que otros.', [//20
      new resp('Verdadero', 'mate'),
      new resp('Falso', ''),
    ]),
    new preg('Me gusta construir modelos ( o hacer esculturas)', [//21
      new resp('Verdadero', 'corporal'),
      new resp('Falso', ''),
    ]),
    new preg('Tengo agudeza para encontrar el significado de las palabras', [//22
      new resp('Verdadero', 'verbal'),
      new resp('Falso', ''),
    ]),
    new preg('Puedo mirar un objeto de una manera y con la misma facilidad verlo', [//23
      new resp('Verdadero', 'visual'),
      new resp('Falso', ''),
    ]),
    new preg('Con frecuencia hago la conexión entre una pieza de música y algún evento de mi vida', [//24
      new resp('Verdadero', 'musica'),
      new resp('Falso', ''),
    ]),
    new preg('Me gusta trabajar con números y figuras', [//25
      new resp('Verdadero', 'mate'),
      new resp('Falso', ''),
    ]),
    new preg('Me gusta sentarme silenciosamente y reflexionar sobre mis sentimientos íntimos', [//26
      new resp('Verdadero', 'intra'),
      new resp('Falso', ''),
    ]),
    new preg('Con sólo mirar la forma de construcciones y estructuras me siento a gusto', [//27
      new resp('Verdadero', 'visual'),
      new resp('Falso', ''),
    ]),
    new preg('Me gusta tararear, silbar y cantar en la ducha o cuando estoy sola', [//28
      new resp('Verdadero', 'musica'),
      new resp('Falso', ''),
    ]),
    new preg('Soy bueno(a) para el atletismo', [//29
      new resp('Verdadero', 'corporal'),
      new resp('Falso', ''),
    ]),
    new preg(' Me gusta escribir cartas detalladas a mis amigos', [//30
      new resp('Verdadero', 'verbal'),
      new resp('Falso', ''),
    ]),
    new preg('Generalmente me doy cuenta de la expresión que tengo en la cara', [//31
      new resp('Verdadero', 'intra'),
      new resp('Falso', ''),
    ]),
    new preg('Me doy cuenta de las expresiones en la cara de otras personas', [//32
      new resp('Verdadero', 'inter'),
      new resp('Falso', ''),
    ]),
    new preg('Me mantengo "en contacto" con mis estados de ánimo. No me cuesta identificarlos', [//33
      new resp('Verdadero', 'intra'),
      new resp('Falso', ''),
    ]),
    new preg('Me doy cuenta de los estados de ánimo de otros', [//34
      new resp('Verdadero', 'inter'),
      new resp('Falso', ''),
    ]),
    new preg('Me doy cuenta bastante bien de lo que otros piensan de mí', [//35
      new resp('Verdadero', 'inter'),
      new resp('Falso', ''),
     ]),
  ];
  constructor() { }

  getPreguntas(){
    return this.preguntas.slice();
  }
}
