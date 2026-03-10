import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagosService } from '../../services/pagos.service';
import { PaymentType, PaymentStatus } from '../../models/pago.model';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// AuthService para obtener el código del estudiante automáticamente
import { AuthService } from '../../services/auth.service';

interface NuevoPagoForm {
  monto: number;
  fecha: string;
  tipo: PaymentType | string;
  estado: PaymentStatus | string;
  codigoEstudiante: string;
}

@Component({
  selector: 'app-new-pago',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  templateUrl: './new-pago.component.html',
  styleUrls: ['./new-pago.component.css'],
})
export class NewPagoComponent {
  nuevoPago: NuevoPagoForm;
  archivoPdf?: File;

  constructor(
    private pagosService: PagosService,
    private snackBar: MatSnackBar,
    private authService: AuthService, // 👈 inyectamos AuthService
  ) {
    // Inicializamos el pago con el código del estudiante desde la sesión
    this.nuevoPago = {
      monto: 0,
      fecha: '',
      tipo: PaymentType.EFECTIVO,
      estado: PaymentStatus.CREADO,
      codigoEstudiante: this.authService.codigoEstudiante ?? '', // 👈 nunca será undefined
    };
  }

  onFileSelected(event: any): void {
    this.archivoPdf = event.target.files[0];
  }

  registrarPago(): void {
    if (!this.archivoPdf) {
      this.snackBar.open('Debes adjuntar un archivo PDF ⚠️', 'Cerrar', {
        duration: 3000,
        panelClass: 'snackbar-error',
      });
      return;
    }

    // 👇 convertir fecha a DD-MM-YYYY
    let fechaFormateada = '';
    if (this.nuevoPago.fecha) {
      const fechaObj = new Date(this.nuevoPago.fecha);
      const dia = String(fechaObj.getDate()).padStart(2, '0');
      const mes = String(fechaObj.getMonth() + 1).padStart(2, '0');
      const anio = fechaObj.getFullYear();
      fechaFormateada = `${dia}-${mes}-${anio}`;
    }

    const formData = new FormData();
    formData.append('monto', String(this.nuevoPago.monto));
    formData.append('fecha', fechaFormateada); // 👈 ahora en DD-MM-YYYY
    formData.append('tipo', this.nuevoPago.tipo || PaymentType.EFECTIVO);
    formData.append('file', this.archivoPdf);
    formData.append('codigoEstudiante', this.nuevoPago.codigoEstudiante);

    this.pagosService.createPago(formData).subscribe({
      next: () => {
        this.snackBar.open('Pago registrado correctamente ✅', 'Cerrar', {
          duration: 3000,
          panelClass: 'snackbar-success',
        });
        this.nuevoPago = {
          monto: 0,
          fecha: '',
          tipo: PaymentType.EFECTIVO,
          estado: PaymentStatus.CREADO,
          codigoEstudiante: this.authService.codigoEstudiante ?? '',
        };
        this.archivoPdf = undefined;
      },
      error: (err) => {
        console.error('Error al registrar pago', err);
        this.snackBar.open(
          'Error al registrar el pago ❌: ' +
            (err.error?.message || err.statusText),
          'Cerrar',
          { duration: 4000, panelClass: 'snackbar-error' },
        );
      },
    });
  }
}
