import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

import { EstudiantesService } from '../services/estudiantes.service';
import { Estudiante } from '../models/estudiante.model';

@Component({
  selector: 'app-load-estudiantes',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatTableModule
  ],
  templateUrl: './load-estudiantes.component.html',
  styleUrls: ['./load-estudiantes.component.css']
})
export class LoadEstudiantesComponent implements OnInit {
  estudiantesDataSource = new MatTableDataSource<Estudiante>([]);
  displayedColumns: string[] = ['id', 'codigo', 'nombre', 'apellido'];

  constructor(private estudiantesService: EstudiantesService) {}

  ngOnInit(): void {
    this.estudiantesService.getAllEstudiantes().subscribe({
      next: (data: Estudiante[]) => {
        this.estudiantesDataSource.data = data;
      },
      error: (err) => {
        console.error('Error al cargar estudiantes:', err);
      }
    });
  }
}
