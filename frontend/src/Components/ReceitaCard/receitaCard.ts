import { Component } from "@angular/core";

@Component({
    selector: "receita-card",
    template: `
        <div class="card-field">
            <div>
                <h2 class="card-title">Receita: Feijão</h2>
            </div>  
            <div>
                <span>Tempo de Preparo: </span>
                <span>2 hrs</span>
            </div> 
            <div>
                <span>Custo Aproximado: </span>
                <span>R$ 19,90</span>
            </div> 
        </div>
    `,
    styleUrl: './receitaCard.css'
})
export default class receitaCard {

}