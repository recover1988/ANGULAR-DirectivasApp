import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[error-msg]'
})
export class ErrorMsgDirective implements OnInit {

  htmlElement: ElementRef<HTMLElement>;
  @Input() color: string = 'red';
  @Input() mensaje: string = '';
  @Input() modificar: boolean = false;

  constructor(private el: ElementRef<HTMLElement>) {
    this.htmlElement = el
  }

  ngOnInit(): void {
    console.log('NgOnInit en la directiva')
    this.setColor()
    this.setMensaje()
    this.setClass()
  }

  setColor(): void {
    this.htmlElement.nativeElement.style.color = this.color;
  }

  setMensaje(): void {
    if (this.mensaje === '') return
    this.htmlElement.nativeElement.innerText = this.mensaje;
  }
  setClass(): void {
    if (!this.modificar) return
    this.htmlElement.nativeElement.classList.add('form-text')
  }
}
