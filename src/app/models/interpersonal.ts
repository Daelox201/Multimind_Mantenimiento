export class interpersonal{
    id?: string;
    pregunta: string;
    buena: string;
    mala1: string;
    mala2:string;
    mala3:string;


    constructor( pregunta: string,buena:string, mala1: string,mala2: string,mala3:string){

        this.pregunta = pregunta;
        this.buena = buena;
        this.mala1 = mala1;
        this.mala2 = mala2;
        this.mala3 =  mala3;
    }
}