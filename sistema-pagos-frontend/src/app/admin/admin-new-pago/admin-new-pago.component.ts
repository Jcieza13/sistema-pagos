import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { formatDate } from '@angular/common';

import { PagosService } from '../../services/pagos.service';
import { EstudiantesService } from '../../services/estudiantes.service';
import { Estudiante } from '../../models/estudiante.model';

import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-new-pago',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './admin-new-pago.component.html',
  styleUrls: ['./admin-new-pago.component.css'],
})
export class AdminNewPagoComponent implements OnInit {
  pagoForm: FormGroup;
  estudiantes: Estudiante[] = [];
  estudiantesFiltrados!: Observable<Estudiante[]>;
  minDate: Date = new Date();

  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private pagosService: PagosService,
    private estudiantesService: EstudiantesService,
     private snackBar: MatSnackBar 

  ) {
    this.pagoForm = this.fb.group({
      estudiante: ['', Validators.required], // aquí guardaremos el código
      monto: [{ value: 150000, disabled: true }],
      fecha: ['', Validators.required],
      tipo: ['', Validators.required],   // tipo de pago
    });
  }

  ngOnInit(): void {
    this.estudiantesService.getAllEstudiantes().subscribe((data: Estudiante[]) => {
      this.estudiantes = data;
      this.estudiantesFiltrados = this.pagoForm.get('estudiante')!.valueChanges.pipe(
        startWith(''),
        map((value) => this._filtrar(value || '')),
      );
    });
  }

  private _filtrar(value: string): Estudiante[] {
    const filtro = value.toLowerCase();
    return this.estudiantes.filter((est) =>
      est.nombre.toLowerCase().includes(filtro),
    );
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  registrarPago(): void {
    if (this.pagoForm.valid) {
      const formData = new FormData();

      // Archivo PDF opcional
      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }

     
      // monto fijo
      formData.append('tipo', this.pagoForm.value.tipo);
      formData.append('fecha',formatDate(this.pagoForm.value.fecha, 'dd-MM-yyyy', 'en-US'));

      // 👇 Guardamos el código del estudiante, no el nombre
      const estudianteCodigo = this.pagoForm.value.estudiante;
      formData.append('codigoEstudiante', estudianteCodigo);

      this.pagosService.createPago(formData).subscribe({
        next: () => {
         this.snackBar.open('✅ Pago registrado correctamente', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.pagoForm.reset();
        this.selectedFile = null;

        },
        error: (err) => {
          console.error('Error al registrar pago', err);
        this.snackBar.open('❌ Hubo un error al registrar el pago', 'Cerrar', {
          duration: 4000,
          panelClass: ['snackbar-error']

        });
      }
      });
    } else {
    
   this.snackBar.open('⚠️ Completa todos los campos obligatorios', 'Cerrar', {
      duration: 3000,
      panelClass: ['snackbar-warning']
    });
  }
}

}