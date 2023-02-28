# DirectivasApp

## Que es una Directiva?

Las Directivas extienden la funcionalidad del HTML usando para ello una nueva sintaxis. Con ella podemos usar lógica que será ejecutada en el DOM (Document Object Model).
Se dividen en tres tipos diferentes:

- Directivas de Atributo
- Directivas estructurales
- Componentes

### Directivas de Artibuto

Alteran la apariencia o comportamiento de un elemento del DOM y son usados como atributos de los elementos.Entre la directivas de atributo, encontramos:

- `ngModel`: Implementa binding
- `ngClass`: permite añadir/eliminar varias clases
- `ngStyle`: permite asignar estilos inline

### Directivas Estructurales

Alteran la estructura del DOM, agregando, eliminando y manipulando los elementos host a los que están unidos. Algunas directivas estructurales tienen un asterisco (\*), que precede al nombre del atributo de la directiva.

En las directivas estructurales podemos encontrar las siguientes:

`*ngIf`: Nos permite incluir condicionales de lógica en nuestro código, como por ejemplo evaluar sentencias, hacer comparaciones, mostrar u ocultar secciones de código, y entre las muchas condiciones que deseemos crear, para que se renderice nuestro HTML, cumpliendo la sentencia a evaluar. Con el \*ngIf, podemos evaluar sentencias con un simple If, podemos evaluar el else, para que no cumpliéndose la primera condición que se evalúa nuestro código ejecute otra acción en el caso contrario y podemos además incluir el then, para que cumpliendose la condición afirmativa (if), podamos añadir más flexibilidad a nuestro código incluyéndole un camino afirmativo adicional.

`*ngFor`: Permite ejecutar bucles, los bucles son los que conocemos en lógica de programación como: for, while, foreach, etc. Con esta directiva estructural podemos evaluar de acuerdo a nuestra condición n veces.

`ngSwitch`: esta directiva es similar al \*ngIf, y es como el switch en lógica de programación. En esta directiva se pueden crear los diferentes casos que deseamos evaluar y cuando se cumple la condición esperada, oculta/muestra el HTML. Nos permite mantener nuestro código más limpio, si necesitamos evaluar varias sentencias.

`ngPlural`: es una directiva que permite agregar o remover elementos del DOM, basado en un valor númerico. Para usar esta directiva, se debe proporcionar un elemento contenedor que establezca el atributo `[ngPlural]` en una expresión de cambio. Los elementos internos con un `[ngPluralCase]` ​​se mostrarán en función de su expresión. Si `[ngPluralCase]` ​​se establece en una expresión (que comience con = o ‘>’ o ‘<’ etc.), el elemento se mostrará, si el valor es igual a la expresión.
Para mostrar valores por defecto se puede usar el string “other”.

`ngTemplate`: esta directiva como su nombre lo indica es un template en Angular. El contenido de esta etiqueta puede reutilizarse en otros templates. Dentro de la etiqueta ng-template tenemos acceso a las mismas variables de contexto que son visibles en el template exterior, como por ejemplo la variable ‘noSuperHeroes’. Esto se debe a que las instancias de ng-template tienen acceso al mismo contexto en el cual están integradas. Además cada template también puede definir su set de variables.

`ngComponentOutlet`: nos permite crear componentes dinámicos.

### Directivas de Componente

Las Directivas de Componente son directivas con un Template. Los componentes tienen decoradores “@Component”, el componente es un decorador @Directive que es extendido con características propias de los templates.

## Crear Nueva Directiva

En el cmd tenenmos que escribir el comando:

```
ng g d [nombre de la directiva] --skip-tests
```

Y se genera el siguiente archivo:

```
import { Directive } from '@angular/core';

@Directive({
  selector: '[appErrorMsg]'
})
export class ErrorMsgDirective {

  constructor() { }

}

```

Si queremos usar la directiva en otro componente tenemos que exportarlo y luego importarlo desde el modulo.

## Directiva

```
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[error-msg]'
})
export class ErrorMsgDirective implements OnInit {

  htmlElement: ElementRef<HTMLElement>;
  @Input() color: string = 'red';

  constructor(private el: ElementRef<HTMLElement>) {
    this.htmlElement = el
  }

  ngOnInit(): void {
    console.log('NgOnInit en la directiva')
    this.setColor()
  }

  setColor(): void {
    this.htmlElement.nativeElement.style.color = this.color;
  }

}
```

En el constructor obtenemos la referencia del elemento DOM, y luego podemos modificar sus propiedades.
Con el `@Input()` podemos enviar a la directiva las propiedades que queremos modificar.

```
      <span
        class="form-text"
        *ngIf="tieneError('nombre')"
        error-msg
        color="blue"
        >Este campo es requerido</span
      >
```

el `error-msg` es la directiva y `color` es el valor que queremos que cambie, tambien se puede poner `[color]` y en este caso se enviaria la referencia del componente y no el valor propiamente dicho.

## Input Setters

Para que la directiva se actualize es mejor usar un setter que asocie la propiedad del Input con el valor a modificar en la directiva.

```
  @Input() set color(valor: string) {
    this.htmlElement.nativeElement.style.color = valor;
    this._color = valor;
  };
  @Input() set mensaje(valor: string) {
    this.htmlElement.nativeElement.innerText = valor
  }
```

Se puede crear funciones que modifique con la propiedad privada y quedaria

```
  @Input() set color(valor: string) {
    this._color = valor;
    this.setColor()
  };
  @Input() set mensaje(valor: string) {
    this._mensaje = valor;
    this.setMensaje()
  }
```

## Formas de Borrar un elemento HTML

Primera: crear una clase CSS `hidden`(display:none) e implementarla con un setter:

```
  @Input() set valido(valor: boolean) {
    if (!valor) {
      this.htmlElement.nativeElement.classList.add('hidden')
    }
    this.htmlElement.nativeElement.classList.remove('hidden')
  };

```

Segunda: inyectar en el constructor el `TemplateRef<HTMLElement>` y el `ViewContainerRef` y luego llamar el metodo `createEmbeddedView(this.templateRef)` y `clear()` para crear y borrar.

```
@Directive({
  selector: '[customif]'
})
export class CustomIfDirective {

  @Input() set customif(condicion: boolean) {
    if (condicion) {
      this.viewContainer.createEmbeddedView(this.templateRef)
    } else {
      this.viewContainer.clear()
    }
  }

  constructor(
    private templateRef: TemplateRef<HTMLElement>,
    private viewContainer: ViewContainerRef
  ) { }

}
```

### Enviar todo el HtmlElement a la Directiva

Pare enviar toda la referencia a la Directiva se usa el `*`

```
*customif="miFormulario.valid"
```

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
