import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[error-msg]'
})
export class ErrorMsgDirective implements OnInit {
  private _color: string = 'pink';
  private _mensaje: string = 'Este campo es requerido';

  htmlElement: ElementRef<HTMLElement>;
  @Input() set color(valor: string) {
    this._color = valor;
    this.setColor()
  };
  // @Input() mensaje: string = '';
  @Input() set mensaje(valor: string) {
    this._mensaje = valor;
    this.setMensaje()
  }

  @Input() modificar: boolean = false;
  @Input() set valido(valor: boolean) {
    if (!valor) {
      this.htmlElement.nativeElement.classList.add('hidden')
    }
    this.htmlElement.nativeElement.classList.remove('hidden')
  };

  constructor(private el: ElementRef<HTMLElement>) {
    this.htmlElement = el
  }


  ngOnInit(): void {
    console.log('NgOnInit en la directiva')

    this.setColor()
    this.setMensaje()
    this.setClass()
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   this.setColor()
  //   this.setMensaje()
  // }


  setColor(): void {
    this.htmlElement.nativeElement.style.color = this._color;
  }

  setMensaje(): void {
    if (this.mensaje === '') return
    this.htmlElement.nativeElement.innerText = this._mensaje;
  }
  setClass(): void {
    if (!this.modificar) return
    this.htmlElement.nativeElement.classList.add('form-text')
  }
}
