import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
  });

  guardar() { }

  tieneError(campo: string): boolean {

    return this.miFormulario.get(campo)?.invalid || false;

  }


  constructor(private fb: FormBuilder) { }
}
