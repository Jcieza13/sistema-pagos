import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

import { EstudiantesService } from '../../services/estudiantes.service';
import { Estudiante } from '../../models/estudiante.model';

@Component({
  selector: 'app-new-estudiante',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './new-estudiante.component.html',
  styleUrls: ['./new-estudiante.component.css'],
})
export class NewEstudianteComponent {
  estudianteForm: FormGroup;
  selectedFile: File | null = null;

  programas = [
    { id: 'ING01', nombre: 'Ingeniería' },
    { id: 'MED01', nombre: 'Medicina' },
    { id: 'DER01', nombre: 'Derecho' },
    { id:  'CONT01', nombre: 'Contabilidad'},
    { id: 'PEDAG01', nombre: 'Pedagogía'},
    { id: 'PSICO01', nombre: 'Psicología'}
  ];

  constructor(
    private fb: FormBuilder,
    private estudiantesService: EstudiantesService,
    private snackBar: MatSnackBar
  ) {
    this.estudianteForm = this.fb.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      programaId: ['', Validators.required],
      foto: ['']
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile && this.selectedFile.type.startsWith('image/')) {
      this.estudianteForm.patchValue({ foto: this.selectedFile.name });
    } else {
      this.snackBar.open('⚠️ Por favor selecciona una imagen válida (PNG/JPG)', 'Cerrar', {
        duration: 3000,
        panelClass: ['snackbar-warning']
      });
      this.selectedFile = null;
    }
  }

  registrarEstudiante(): void {
    if (this.estudianteForm.valid) {
      const nuevoEstudiante: Estudiante = {
        codigo: this.estudianteForm.value.codigo,
        nombre: this.estudianteForm.value.nombre,
        apellido: this.estudianteForm.value.apellido,
        programaId: this.estudianteForm.value.programaId,
        foto: this.estudianteForm.value.foto
      };

      const formData = new FormData();
      Object.entries(nuevoEstudiante).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }

      this.estudiantesService.createEstudiante(formData).subscribe({
        next: (est: Estudiante) => {
          this.snackBar.open(`✅ Estudiante ${est.nombre} registrado correctamente`, 'Cerrar', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
          this.estudianteForm.reset({ foto: '' });
          this.selectedFile = null;
        },
        error: (err) => {
          console.error('Error al registrar estudiante', err);
          this.snackBar.open('❌ Hubo un error al registrar el estudiante', 'Cerrar', {
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