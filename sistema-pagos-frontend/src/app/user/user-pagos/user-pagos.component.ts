import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { PagosService } from '../../services/pagos.service';
import { Pago } from '../../models/pago.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-pagos',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule],
  templateUrl: './user-pagos.component.html',
  styleUrls: ['./user-pagos.component.css'],
})
export class UserPagosComponent implements OnInit {
  pagos: Pago[] = [];
  displayedColumns: string[] = ['id', 'monto', 'fecha', 'tipo', 'estado', 'file'];

  constructor(
    private pagosService: PagosService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Obtiene el código del estudiante logueado desde AuthService
   const codigoEstudiante: string | undefined = this.authService.codigoEstudiante;

if (!codigoEstudiante) {
  console.error('No se encontró código de estudiante en sesión');
  return;
}

this.pagosService.getPagosDeEstudiante(codigoEstudiante).subscribe({
  next: (data: Pago[]) => {
    this.pagos = data;
    console.log(`Pagos del estudiante ${codigoEstudiante}:`, data);
  },
  error: (err) => console.error('Error al cargar pagos', err),
});
  }
}