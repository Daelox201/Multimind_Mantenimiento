export class mast{
    id?: string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    carrera:string;
    activo: string;
    tiempo:string;
    correo:string;
    matricula: string;
    psw:string;
    perfil: String;

    constructor( nombre: string,activo:string, apellidoPaterno: string,apellidoMaterno: string,carrera:string,tiempo:string, correo: string, matricula: string, psw: string, perfil:String){

        this.nombre = nombre;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.carrera = carrera;
        this.tiempo =  tiempo;
        this.correo = correo;
        this.matricula = matricula;
        this.psw = psw;
        this.perfil= 'docente';
        this.activo= 'success';
      
    }
}