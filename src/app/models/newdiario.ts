export class newdiario{
    id?: string;
    idDiario?: string;
    fecha: string;
    titulo: string;
    sentimiento: string;
    descripcion: string;

    constructor( fecha: string,titulo:string, sentimiento: string,descripcion: string){

        this.fecha = fecha;
        this.titulo = titulo;
        this.sentimiento = sentimiento;
        this.descripcion = descripcion;
    }
}