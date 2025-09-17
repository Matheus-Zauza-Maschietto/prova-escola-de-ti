import { Component, effect, inject, signal } from '@angular/core';
import receitaCard from '../Components/ReceitaCard/receitaCard';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import ReceitaService from '../services/receitaService';
import Receita from '../entities/receita';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [receitaCard, ReactiveFormsModule],
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
          <input type="text" id="nome" [formControl]="nome">
        </div>
        <div class="form-field">
          <Label for="tempo-duracao">
            Tempo de Duração
          </Label>
          <input type="number" min="0" id="tempo-duracao" [formControl]="tempoDuracao">
        </div>
        <div class="form-field">
          <Label for="custo-estimado">
            Custo Estimado
          </Label>
          <input type="text" id="custo-estimado" [formControl]="custoEstimado">
        </div>
        <button class="form-button" (click)="criarReceita($event)">Adicionar Receita</button>
      </form>
      <div class="recipes">
        <h1 style="text-align: center;">Minhas Receitas</h1>
        <ul>
          @for (receita of this.receitas; track $index) {
            <li><receita-card (atualizar)="listarReceitas()" [receita]="receita" /></li>
          }
        </ul>
      </div>
    </main>
  `,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
  public nome = new FormControl('');
  public tempoDuracao = new FormControl(0);
  public custoEstimado = new FormControl(0);
  private receitaService = inject(ReceitaService);
  public receitas!: Receita[]

  constructor() {
    effect(() => {
      this.listarReceitas();
    })
  }

  public async listarReceitas(): Promise<void> {
    this.receitaService.listarReceita().subscribe(response => {
      this.receitas = response
    });
  }

  public async criarReceita(event: PointerEvent): Promise<void> {
    event.preventDefault();
    if(this.nome.value === '' || 
       this.tempoDuracao.value === 0 ||
       this.custoEstimado.value === 0){
        alert("Erro ao criar receita. Existem campos não preenchidos");
        return;
    }
    await this.receitaService.criarReceita({
      id: null,
      nome: this.nome.value!,
      custoAproximado: this.custoEstimado.value!,
      tempoPreparo: this.tempoDuracao.value!
    })
    .subscribe(response => {
      this.nome.setValue('');
      this.tempoDuracao.setValue(0);
      this.custoEstimado.setValue(0);
      this.listarReceitas();
    })
  }
}
