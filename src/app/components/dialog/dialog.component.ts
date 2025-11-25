import { Component, ElementRef, inject, signal, viewChild } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogRef } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";
export interface DialogResult{
    name:string,
    color:string
}
@Component({
    selector:'dialog-component',
    imports:[MatInputModule, MatButtonModule, MatIconModule, MatTooltipModule],
    standalone: true,
    templateUrl: "./dialog.template.html",
    styleUrl: "./dialog.css"
})
export class DialogComponent{
    private ref = inject(MatDialogRef<DialogComponent, DialogResult | null>);
    

    name = signal('');
    color = signal('#ffffff');


    onCancel(){
        this.ref.close(null); //no retorna nada
    }

    onConfirm(){
        const result:DialogResult = {
            name: this.name().trim(),
            color: this.color()
        }
        this.ref.close(result);
    }
}