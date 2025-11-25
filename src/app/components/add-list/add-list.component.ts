import { Component, ElementRef, EventEmitter, HostListener, inject, Input, Output, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from "@angular/material/input";
import { BoardStore } from '../../services/board.store';
import { AutofocusDirective } from "../../directives/autofocus.directive";

@Component({
  selector: 'add-list-component',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatInputModule, AutofocusDirective],
  styleUrl: './add-list.css',
  templateUrl: './add-list.template.html',
})
export class AddListComponent {
  @Input() id!:string;
  private store = inject(BoardStore);
  private host = inject(ElementRef<HTMLElement>);
  editing = signal(false);
  name = signal('');

  cancel() {
    this.editing.set(false);
    this.name.set('');
  }
  confirm(){
    let primeraLetra = this.name().charAt(0).toUpperCase();
    let resto= this.name().slice(1);
    this.name.set(primeraLetra+resto);
    this.store.addNewList(this.id,this.name());
  }

  @HostListener('document:click', ['$event'])
  onDocumentCLick(ev:MouseEvent){
    const clickedInside = this.host.nativeElement.contains(ev.target as Node);
    if (!clickedInside) this.cancel();
  }

  onKeyDown(ev: KeyboardEvent) {
    if (ev.key === 'Escape') {
      ev.preventDefault();
      this.cancel();
    } else if (ev.key === 'Enter') {
      ev.preventDefault();
      this.confirm();
    }
  }

}
