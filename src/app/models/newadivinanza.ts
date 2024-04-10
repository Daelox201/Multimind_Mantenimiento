export class newadivinanza{
    id?: string;
    adivinanza: string;
    palabra: string;
    pista: string;


    constructor( adivinanza: string,palabra:string, pista: string,src: string){

        this.adivinanza = adivinanza;
        this.palabra = palabra;
        this.pista = pista;

    }
}