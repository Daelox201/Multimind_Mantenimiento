export class admin{
    id?: string;
    correo:string;
    psw:string;
    perfil: String;

    constructor(  correo: string,  psw: string){

        this.correo = correo;
        this.psw = psw;
        this.perfil= 'Admin';
      
    }
}