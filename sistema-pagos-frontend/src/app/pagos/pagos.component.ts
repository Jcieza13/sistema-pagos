import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagosService } from '../services/pagos.service';
import { Pago, PaymentStatus } from '../models/pago.model';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule
  ],
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css'],
})
export class PagosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'fecha', 'monto', 'tipo', 'estado', 'estudiante', 'file', 'acciones'];
  dataSource = new MatTableDataSource<Pago>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private pagosService: PagosService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.pagosService.getAllPagos().subscribe((data: Pago[]) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  aprobarPago(id: number): void {
    this.pagosService.updateEstado(id, PaymentStatus.VALIDADO).subscribe(() => {
      this.dataSource.data = this.dataSource.data.map((p) =>
        p.id === id ? { ...p, estado: PaymentStatus.VALIDADO } : p
      );
      this.snackBar.open('Pago aprobado correctamente ✅', 'Cerrar', { duration: 3000 });
    });
  }

  rechazarPago(id: number): void {
    this.pagosService.updateEstado(id, PaymentStatus.RECHAZADO).subscribe(() => {
      this.dataSource.data = this.dataSource.data.map((p) =>
        p.id === id ? { ...p, estado: PaymentStatus.RECHAZADO } : p
      );
      this.snackBar.open('Pago rechazado ❌', 'Cerrar', { duration: 3000 });
    });
  }
}