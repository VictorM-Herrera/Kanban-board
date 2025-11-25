import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogRef } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Attachment, ChecklistItem, Label, Member } from "../../models/kanban.model";

export interface DialogResult{
        title: string;//puedo cambiar el titulo
        isChecked: boolean;
        banner?:string;//color
        description?:string;
        startDate?: Date;
        endDate?:Date;
        checklist?: ChecklistItem[];
        attachments?: Attachment[];//archivos adjuntos
        labels?:Label[];//etiquetas
        members?:Member[];
}
@Component({
    selector:'card-dialog-component',
    imports:[MatInputModule, MatButtonModule, MatIconModule, MatTooltipModule],
    standalone: true,
    templateUrl: "./card-dialog.template.html",
    styleUrl: "./card-dialog.css"
})
export class CardDialogComponent{
    private ref = inject(MatDialogRef<CardDialogComponent, DialogResult | null>);
    
    // onConfirm(){
    //         const result:DialogResult = {
    //         }
    //         this.ref.close(result);
    //     }
    onCancel(){
        this.ref.close(null); //no retorna nada
    }

}