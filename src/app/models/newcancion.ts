export class newcancion{
    id?: string;
    nombre: string;
    Descripcion: string;
    src: string;


    constructor( nombre: string,activo:string, Descripcion: string,src: string){

        this.nombre = nombre;
        this.Descripcion = Descripcion;
        this.src = src;

    }
}