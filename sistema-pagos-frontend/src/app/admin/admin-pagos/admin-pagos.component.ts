import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagosService } from '../../services/pagos.service';
import { Pago } from '../../models/pago.model';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-admin-pagos',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatToolbarModule
  ],
  templateUrl: './admin-pagos.component.html',
  styleUrls: ['./admin-pagos.component.css']
})
export class AdminPagosComponent implements OnInit {
  pagosDataSource = new MatTableDataSource<Pago>([]);
  displayedColumns: string[] = ['id', 'estudiante', 'monto', 'fecha', 'estado', 'acciones'];

  constructor(private pagosService: PagosService) {}

  ngOnInit(): void {
    this.pagosService.getAllPagos().subscribe(data => {
      this.pagosDataSource.data = data;
    });
  }

  actualizarEstado(pagoId: number, nuevoEstado: string) {
    this.pagosService.updateEstado(pagoId, nuevoEstado).subscribe(() => {
      this.ngOnInit(); // refrescar lista
    });
  }
}