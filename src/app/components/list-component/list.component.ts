import {
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  Inject,
  Input,
  signal,
  ViewChild,
} from '@angular/core';
import { BoardStore } from '../../services/board.store';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AutofocusDirective } from '../../directives/autofocus.directive';
import { CardComponent } from '../card-component/card.component';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { elementAt } from 'rxjs';

@Component({
  selector: 'list-component',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, AutofocusDirective, CardComponent, DragDropModule],
  templateUrl: './list.template.html',
  styleUrl: './list.css',
})
export class ListComponent {
  @Input() boardId!: string;
  @Input() id!: string;
  @Input() name!: string;

  private host = inject(ElementRef<HTMLElement>);
  private store = inject(BoardStore);
  editing = signal(false);
  cardName = signal('');

  listData = computed(() => {
    const boards = this.store.boardList();
    const board = boards.find((b) => b.id === this.boardId);
    return board?.lists.find((list) => list.id === this.id);
  });

  connectedTo = computed(()=>{
    const board = this.store.boardList().find(b => b.id === this.boardId);
    return(board?.lists ?? []).map(l => l.id).filter(listId => listId !== this.id);
  });

  dropCards(ev: CdkDragDrop<any>) {
    const boardId = this.boardId;
    const toListId = (ev.container.data as any)?.listId;
    const fromListId = (ev.previousContainer.data as any)?.listId ?? toListId;

    if (ev.previousContainer === ev.container) {
      if (ev.previousIndex === ev.currentIndex) return;
      this.store.reorderCards(boardId, toListId, ev.previousIndex, ev.currentIndex);
    } else {
      this.store.moveCard(boardId, fromListId, toListId, ev.previousIndex, ev.currentIndex);
    }
  }

  cancel() {
    this.editing.set(false);
  }
  onCardInput(elemento: HTMLTextAreaElement) {
    this.resizeTextArea(elemento);
    this.cardName.set(elemento.value);
  }
  resizeTextArea(elemento: HTMLElement) {
    elemento.style.height = 'auto';
    elemento.style.height = elemento.scrollHeight + 'px';
  }
  confirm(elemento: HTMLTextAreaElement) {
    this.store.addNewCard(this.boardId, this.id, this.cardName());
    elemento.value = '';
  }

  @HostListener('document:click', ['$event'])
  onDocumentCLick(ev: MouseEvent) {
    const clickedInside = this.host.nativeElement.contains(ev.target as Node);
    if (!clickedInside) this.cancel();
  }

  onKeyDown(ev: KeyboardEvent) {
    if (ev.key === 'Escape') {
      ev.preventDefault();
      this.cancel();
    } else if (ev.key === 'Enter') {
      ev.preventDefault();
      this.store.addNewCard(this.boardId, this.id, this.cardName());
      this.cardName.set('');
    }
  }
}
