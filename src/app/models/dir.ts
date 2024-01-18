export class dir{
    id?: string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    carrera:string;
    cargo:string;
    correo:string;
    activo: string;
    matricula: string;
    psw:string;
    perfil: String;

    constructor( nombre: string,activo:string, apellidoPaterno: string,apellidoMaterno: string,carrera:string,cargo:string, correo: string, matricula: string, psw: string, perfil:String){

        this.nombre = nombre;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.carrera = carrera;
        this.cargo =  cargo;
        this.correo = correo;
        this.matricula = matricula;
        this.psw = psw;
        this.perfil= 'directivo';
        this.activo = 'success';
      
    }
}