import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  solveSudoku(options: any): Observable<any> {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'X-RapidAPI-Key': 'be01b3cad2msha6e779bba3d1c54p18646djsn22bb19bb75ae',
      'X-RapidAPI-Host': 'sudoku-solver3.p.rapidapi.com'
    });

    return this.http.post(options.url, options.data, { headers });
  }
}