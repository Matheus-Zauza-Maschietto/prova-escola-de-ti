import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import Ingrediente from "../entities/ingrediente";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export default class IngredienteService {
    private http = inject(HttpClient);

    public criarIngrediente(receitaId: number, ingrediente: Ingrediente): Observable<Ingrediente> {
        return this.http.post<Ingrediente>(`http://localhost:5082/receitas/${receitaId}/ingredientes`, ingrediente)
    }

    public listarIngrediente(receitaId: number): Observable<Ingrediente[]> {
        return this.http.get<Ingrediente[]>(`http://localhost:5082/receitas/${receitaId}/ingredientes`)
    }

    public atualizarIngrediente(id: number, ingrediente: Ingrediente): Observable<Ingrediente> {
        return this.http.put<Ingrediente>(`http://localhost:5082/ingredientes/${id}`, ingrediente)
    }

    public deletarIngrediente(id: number): Observable<void> {
        return this.http.delete<void>(`http://localhost:5082/ingredientes/${id}`)
    }
}
