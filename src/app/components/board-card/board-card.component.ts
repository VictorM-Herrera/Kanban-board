import { Component, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BoardStore } from '../../services/board.store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'board-card',
  imports: [MatIconModule, MatTooltipModule, RouterLink],
  standalone: true,
  templateUrl: './board-card.template.html',
  styleUrl: './board-card.css',
})
//este componente va a recibir por prop el nombre y el color del tablero
export class BoardCard {
  @Input() name!: string; //@Input es para "pedir" por propiedades del elemento
  @Input() color!: string;
  @Input() boardId!:string;
  @Input() isFav!:boolean;

  private store = inject(BoardStore);

  addToFav = () => this.store.addBoardToFav(this.boardId);
}
