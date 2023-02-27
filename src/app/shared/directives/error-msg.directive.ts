import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[error-msg]'
})
export class ErrorMsgDirective implements OnInit {
  private _color: string = 'red';

  htmlElement: ElementRef<HTMLElement>;
  @Input() set color(valor: string) {
    this.htmlElement.nativeElement.style.color = valor;
    this._color = valor;
  };
  // @Input() mensaje: string = '';
  @Input() modificar: boolean = false;
  @Input() set mensaje(valor: string) {
    this.htmlElement.nativeElement.innerText = valor
  }



  constructor(private el: ElementRef<HTMLElement>) {
    this.htmlElement = el
  }


  ngOnInit(): void {
    console.log('NgOnInit en la directiva')
    // this.setColor()
    // this.setMensaje()
    this.setClass()
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   this.setColor()
  //   this.setMensaje()
  // }


  // setColor(): void {
  //   this.htmlElement.nativeElement.style.color = this.color;
  // }

  // setMensaje(): void {
  //   if (this.mensaje === '') return
  //   this.htmlElement.nativeElement.innerText = this.mensaje;
  // }
  setClass(): void {
    if (!this.modificar) return
    this.htmlElement.nativeElement.classList.add('form-text')
  }
}
