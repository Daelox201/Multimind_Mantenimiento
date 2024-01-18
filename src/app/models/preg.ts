import { resp } from "./resp";

export class preg{
    descripcion: string;
    respuesta: resp[];


constructor(descripcion: string, respuesta: resp[]){
    this.descripcion = descripcion;
    this.respuesta = respuesta;
}

}