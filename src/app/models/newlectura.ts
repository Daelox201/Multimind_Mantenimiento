export class newlectura{
    id?: string;
    // numero: number;
    titulo: string;
    lectura: string;
    preg1: string;
    preg2: string;
    preg3: string;
    preg4: string;
    preg5: string;
    resp1: string;
    resp2: string;
    resp3: string;
    resp4: string;
    resp5: string;

    constructor(titulo: string, lectura: string, preg1: string, preg2: string, preg3: string, preg4: string, preg5: string,
        resp1: string,resp2: string,resp3: string,resp4: string, resp5: string){


        // this.numero = numero;
        this.titulo = titulo;
        this.lectura = lectura;
        this.preg1 = preg1;
        this.preg2 = preg2;
        this.preg3 = preg3;
        this.preg4 = preg4;
        this.preg5 = preg5;
        this.resp1 = resp1;
        this.resp2 = resp2;
        this.resp3 = resp3;
        this.resp4 = resp4;
        this.resp5 = resp5;

      
    }
}