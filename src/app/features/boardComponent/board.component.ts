import { Component, computed, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { BoardStore } from '../../services/board.store';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { AddListComponent } from '../../components/add-list/add-list.component';
import { ListComponent } from "../../components/list-component/list.component";
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { List } from '../../models/kanban.model';

@Component({
  selector: 'board-component',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatTooltipModule, AddListComponent, ListComponent, DragDropModule],
  templateUrl: './boardComponent.template.html',
  styleUrl: './boardComponent.css',
})
export class BoardComponent {
  private store = inject(BoardStore);
  private route = inject(ActivatedRoute);
  //aca guardo el parametro cuando se carga el componente

  boardId = toSignal(this.route.paramMap.pipe(map((p) => p.get('id'))), {
    initialValue: this.route.snapshot.paramMap.get('id'),
  });
  boardData = computed(() => {
    const id = this.boardId();
    return this.store.boardList().find((board) => board.id === id) ?? null;
  });

  //dragdrop-listas
  onDropLists(e: CdkDragDrop<List[] | undefined>) {
    const id = this.boardId()!;
    if (!this.boardData()) return

    if(e.previousIndex === e.currentIndex) return;
    this.store.reorderLists(id, e.previousIndex, e.currentIndex);
  }
  
}
