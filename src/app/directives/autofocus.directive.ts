import { AfterViewInit, Directive, ElementRef } from "@angular/core";

@Directive({
    selector: '[autofocus]',
    standalone: true
})
export class AutofocusDirective implements AfterViewInit{
    constructor(private el: ElementRef){}
    
    ngAfterViewInit(): void {
        this.el.nativeElement.focus();
    }
}