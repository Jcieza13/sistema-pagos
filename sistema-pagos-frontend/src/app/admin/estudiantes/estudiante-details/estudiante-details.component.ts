import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PagosService } from '../../../services/pagos.service';
import { Pago } from '../../../models/pago.model';

@Component({
  selector: 'app-estudiante-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule
  ],
  templateUrl: './estudiante-details.component.html',
  styleUrls: ['./estudiante-details.component.css']
})
export class EstudianteDetailsComponent implements OnInit {

  estudianteCodigo!: string;   // 👈 ahora es string
  pagosEstudiante: Pago[] = [];
  pagosDataSource = new MatTableDataSource<Pago>([]);

  public displayedColumns = ['id', 'fecha', 'monto', 'tipo', 'estado', 'estudiante'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private pagosService: PagosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtenemos el parámetro de la ruta (codigo del estudiante)
    this.estudianteCodigo = this.activatedRoute.snapshot.params['codigo'];

    if (!this.estudianteCodigo) {
      console.error('No se encontró código de estudiante en la ruta');
      return;
    }

    // Llamamos al servicio para obtener los pagos de ese estudiante
    this.pagosService.getPagosDeEstudiante(this.estudianteCodigo).subscribe({
      next: value => {
        this.pagosEstudiante = value;
        this.pagosDataSource.data = this.pagosEstudiante;
      },
      error: err => {
        console.error('Error al cargar pagos del estudiante:', err);
      }
    });
  }

  agregarPago() {
    this.router.navigateByUrl(`/admin/new-pago/${this.estudianteCodigo}`);
  }
}