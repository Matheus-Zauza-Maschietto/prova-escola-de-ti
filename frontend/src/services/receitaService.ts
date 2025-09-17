import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import Receita from "../entities/receita";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export default class ReceitaService {
  private http = inject(HttpClient);

  public criarReceita(receita: Receita): Observable<Receita> {
    return this.http.post<Receita>('http://localhost:5082/receitas', receita)
  }

  public listarReceita(): Observable<Receita[]> {
    return this.http.get<Receita[]>(`http://localhost:5082/receitas`)
  }

  public atualizarReceita(id: number, receita: Receita): Observable<Receita> {
    return this.http.put<Receita>(`http://localhost:5082/receitas/${id}`, receita)
  }

  public deletarReceita(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:5082/receitas/${id}`)
  }
}