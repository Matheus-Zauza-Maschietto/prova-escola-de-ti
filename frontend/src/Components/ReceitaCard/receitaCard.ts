import { Component, effect, inject, Input, model, output } from "@angular/core";
import ingredienteItem from "../IngredienteItem/ingredienteItem";
import Receita from "../../entities/receita";
import ReceitaService from "../../services/receitaService";
import { Observable } from "rxjs";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import Ingrediente from "../../entities/ingrediente";
import IngredienteService from "../../services/ingredienteService";

@Component({
    selector: "receita-card",
    imports: [ingredienteItem, ReactiveFormsModule],
    template: `
        <div class="card">
            <div class="card-title" style="position: relative;">
                <input type="text" class="h2" [readonly]="!editavel" [formControl]="nome" >
                <svg (click)="deletarCard()" style="fill: whitesmoke; width: 16px; position: absolute; top: 50%; right: 10px; transform: translateY(-50%);"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M136.7 5.9L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-8.7-26.1C306.9-7.2 294.7-16 280.9-16L167.1-16c-13.8 0-26 8.8-30.4 21.9zM416 144L32 144 53.1 467.1C54.7 492.4 75.7 512 101 512L347 512c25.3 0 46.3-19.6 47.9-44.9L416 144z"/></svg>
                <svg (click)="abrirParaEdicao()" style="fill: whitesmoke; width: 20px; position: absolute; top: 50%; right: 35px; transform: translateY(-50%);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M100.4 417.2C104.5 402.6 112.2 389.3 123 378.5L304.2 197.3L338.1 163.4C354.7 180 389.4 214.7 442.1 267.4L476 301.3L442.1 335.2L260.9 516.4C250.2 527.1 236.8 534.9 222.2 539L94.4 574.6C86.1 576.9 77.1 574.6 71 568.4C64.9 562.2 62.6 553.3 64.9 545L100.4 417.2zM156 413.5C151.6 418.2 148.4 423.9 146.7 430.1L122.6 517L209.5 492.9C215.9 491.1 221.7 487.8 226.5 483.2L155.9 413.5zM510 267.4C493.4 250.8 458.7 216.1 406 163.4L372 129.5C398.5 103 413.4 88.1 416.9 84.6C430.4 71 448.8 63.4 468 63.4C487.2 63.4 505.6 71 519.1 84.6L554.8 120.3C568.4 133.9 576 152.3 576 171.4C576 190.5 568.4 209 554.8 222.5C551.3 226 536.4 240.9 509.9 267.4z"/></svg>
            </div>  
            <form class="card-description">
                <h3>Descrição Rápida</h3>
                <div class="card-field">
                    <label>Tempo de Preparo: </label>
                    <input type="number" max="2147483646" min="0" [readonly]="!editavel" [formControl]="tempoPreparo">
                </div> 
                <div class="card-field">
                    <label>Custo Aproximado: </label>
                    <input type="number" max="2147483646" min="0" [readonly]="!editavel" [formControl]="custoEstimado" >
                </div> 
                <button class="save-button" (click)="atualizarReceita($event)">Adicionar Receita</button>
            </form>
            <div class="card-content">
                <h3>Ingredientes</h3>
                <form class="card-field">
                    <h4>Adicionar Ingrediente</h4>
                    <label for="nome-ingrediente">Nome: </label>
                    <input type="text" id="nome-ingrediente" [formControl]="nomeIngrediente">
                    <button class="save-button" (click)="adicionarIngrediente($event)">Adicionar Ingrediente</button>
                </form>
                <ul>
                    @for (ingrediente of this.ingredientes; track $index) {
                        <ingrediente-item (atualizar)="listarIngredientes(this.receita.id!)" [ingrediente]="ingrediente"/>
                    }
                </ul>
            </div>
        </div>
    `,
    styleUrl: './receitaCard.css'
})
export default class receitaCard {
    @Input() public receita!: Receita;
    public nome = new FormControl('');
    public tempoPreparo = new FormControl(0);
    public custoEstimado = new FormControl(0);
    public receitaService = inject(ReceitaService);
    public ingredienteService = inject(IngredienteService);
    public editavel: boolean = false;
    public atualizar = output<void>();
    public ingredientes!: Ingrediente[]
    public nomeIngrediente = new FormControl('');

    constructor() {
        effect(() => {
            this.listarIngredientes(this.receita.id!)
            this.nome.setValue(this.receita.nome);
            this.tempoPreparo.setValue(this.receita.tempoPreparo);
            this.custoEstimado.setValue(this.receita.custoAproximado);
            this.editavel = false;
        })
    }

    public async listarIngredientes(receitaId: number): Promise<void> {
        this.ingredienteService.listarIngrediente(receitaId)
        .subscribe(response => {
            this.ingredientes = response
        });
    }

    public async adicionarIngrediente(event: PointerEvent){
        event.preventDefault();

        if(this.nome.value == ''){
            alert(`Erro ao adicionar ingrediente para ${this.receita.nome}. É preciso adicionar um nome`)
            return;
        }

        this.ingredienteService.criarIngrediente(this.receita.id!, {
            nome: this.nomeIngrediente.value!
        } as Ingrediente)
        .subscribe(() => {
            this.listarIngredientes(this.receita.id!);
            this.nomeIngrediente.setValue('');
        })
    }

    public atualizarReceita(event: PointerEvent): void {
        event.preventDefault();
        this.receitaService.atualizarReceita(this.receita.id!, {
            nome: this.nome.value!,
            tempoPreparo: this.tempoPreparo.value!,
            custoAproximado: this.custoEstimado.value!
        } as Receita)
        .subscribe(() => {
            this.atualizar.emit()
            this.editavel = false;
        })
    }

    public deletarCard(){
        this.receitaService.deletarReceita(this.receita.id!).subscribe(() => this.atualizar.emit());
    }

    public abrirParaEdicao(){
        this.editavel = true;
    }
}