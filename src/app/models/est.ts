
export class est{
    id?: string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    correo:string;
    matricula: string;
    carrera: string;
    tutor: string;
    psw:string;
    perfil: String;
    test: string;
    activo: string;
    IL: number;
    ILM: number;
    IVE: number;
    IKC: number;
    IM: number;
    IITRA: number;
    IINTER: number;
    intentos: number;



    constructor( nombre: string,activo: string,test:string, apellidoPaterno: string,apellidoMaterno: string,carrera: string,tutor: string, 
        correo: string, matricula: string, psw: string, perfil:String, IL: number,
        ILM: number,IVE: number,IKC: number,IM: number,IITRA: number,IINTER: number, intentos: number){

        this.nombre = nombre;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.correo = correo;
        this.matricula = matricula;
        this.carrera = carrera;
        this.tutor = tutor;
        this.psw = psw;
        this.perfil= perfil;
        this.test = test;
        this.activo= activo;
        this.IL= IL;
        this.ILM= ILM;
        this.IVE= IVE;
        this.IKC= IKC;
        this.IM= IM;
        this.IITRA= IITRA;
        this.IINTER= IINTER;
        this.intentos = intentos;

      
    }
}