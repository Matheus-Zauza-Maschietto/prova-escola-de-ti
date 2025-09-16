import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import receitaCard from '../Components/ReceitaCard/receitaCard';

@Component({
  selector: 'app-root',
  imports: [receitaCard],
  template: `
    <main>
      <header>
        <h1 style="text-align: center;">Adicionar Receita</h1>
      </header>
      <form>
        <div class="form-field">
          <Label for="nome">
            Nome
          </Label>
          <input type="text" id="nome">
        </div>
        <div class="form-field">
          <Label for="tempo-duracao">
            Tempo de Duração
          </Label>
          <input type="number" min="0" id="tempo-duracao">
        </div>
        <div class="form-field">
          <Label for="custo-estimado">
            Custo Estimado
          </Label>
          <input type="text" id="custo-estimado">
        </div>
        <button class="form-button">Adicionar Receita</button>
      </form>
      <div class="recipes">
        <h1 style="text-align: center;">Minhas Receitas</h1>
        <ul>
          <li><receita-card></receita-card></li>
          <li><receita-card></receita-card></li>          
        </ul>
      </div>
    </main>
  `,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
