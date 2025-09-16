import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import receitaCard from '../Components/ReceitaCard/receitaCard';

@Component({
  selector: 'app-root',
  imports: [receitaCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
