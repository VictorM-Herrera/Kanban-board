import { Component, inject, signal } from "@angular/core";
import { BoardStore } from "../../services/board.store";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent, DialogResult } from "../../components/dialog/dialog.component";
import { BoardCard } from "../../components/board-card/board-card.component";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";


@Component({
  selector: 'app-board-creator',
  standalone: true,
  imports: [MatIconModule, BoardCard, MatButtonModule, MatTooltipModule],
  templateUrl: './board-creator.template.html',
  styleUrl: './board-creator.css'
})
export class BoardCreatorComponent{
  //injects de los servicios
  private store = inject(BoardStore);
  private dialog = inject(MatDialog);

  boards = this.store.boardList;
  hasFav = this.store.hasAnyFav;

  borrarDatos = () => this.store.deleteAllBoards();

  openDialog(){
    const ref = this.dialog.open(DialogComponent, {
      width: '400px',
      maxWidth: '95vw',
      height: '300px',
      maxHeight: "95vh"
    });

    ref.afterClosed().subscribe((result: DialogResult | null )=> {
      if (result) {
        let primeraLetra = result.name.charAt(0).toUpperCase();
        let resto = result.name.slice(1);
        this.store.addNewBoard(primeraLetra + resto, result.color);
      }
    })
  }



}