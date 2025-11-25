import { Component, inject, Input, signal } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BoardStore } from "../../services/board.store";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'card-component',
  standalone: true,
  imports: [MatIconModule, MatIconModule,MatTooltipModule],
  templateUrl: './card.template.html',
  styleUrl: './card.css',
})
export class CardComponent{
    @Input() cardName!:string;
    @Input() isChecked!:boolean;
    @Input() boardId!:string;
    @Input() listId!:string;
    @Input() id!:string;

    private store = inject(BoardStore);
    private dialog = inject(MatDialog);

    handleCheck = () => {
       this.store.checkCard(this.boardId,this.listId,this.id);
    }
    
    
}