import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Hero } from './components/hero/hero';
import { InfoSection } from './components/info-section/info-section';

@Component({
  imports: [
    RouterOutlet,
    Header,
    Hero,
    Footer,
    InfoSection
  ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('gamestore-ui');
}
