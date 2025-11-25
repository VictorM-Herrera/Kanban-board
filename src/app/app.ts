import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  //protected readonly title = signal('kanban-board');
}
/**
 * --Primero una pagina, que contenga unos rectangulos en el centro con + title crear nuevo tablero--
 *-- Ahora link en las cards que guarde el id del tablero, te rediriga a /tablero
 * y cargue las listas, y las cards en cada lista...--
 * --Aca va a haber boton de crearlista
 * en las listas un boton de crear card.--
 * --Estos botones de crear son como en trello que se abre un texto en el lugar y un confirmar.
 * [NO se abre un modal]--
 * --Una vez terminado esto, incluir LocalStorage--
 * 
 * Corregir estilos luego de la implementacion del drag and drop
 * Crear la ventana modal de las cards, para darles fecha y toda esa wea.
 */

