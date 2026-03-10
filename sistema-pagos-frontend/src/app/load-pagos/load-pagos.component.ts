import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { DatePipe, CurrencyPipe } from '@angular/common'; 



import { PagosService } from '../services/pagos.service';
import { Pago } from '../models/pago.model';

@Component({
  selector: 'app-load-pagos',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    DatePipe,        
    CurrencyPipe 
  ],
  templateUrl: './load-pagos.component.html',
  styleUrls: ['./load-pagos.component.css']
})
export class LoadPagosComponent implements OnInit {
  pagosDataSource = new MatTableDataSource<Pago>([]);
  displayedColumns: string[] = ['id', 'fecha', 'monto', 'tipo', 'estado', 'estudiante'];

  constructor(private pagosService: PagosService) {}

  ngOnInit(): void {
    this.pagosService.getAllPagos().subscribe({
      next: (data: Pago[]) => {
        this.pagosDataSource.data = data;
      },
      error: (err) => {
        console.error('Error al cargar pagos:', err);
      }
    });
  }
}