import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudiantesService } from '../../services/estudiantes.service';
import { Estudiante } from '../../models/estudiante.model';

// Angular Material
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {
  estudiantesDataSource = new MatTableDataSource<Estudiante>([]);
  displayedColumns: string[] = ['id', 'codigo', 'nombre', 'apellido', 'acciones'];

  constructor(private estudiantesService: EstudiantesService) {}

  ngOnInit(): void {
    this.estudiantesService.getAllEstudiantes().subscribe(data => {
      this.estudiantesDataSource.data = data;
    });
  }

  eliminarEstudiante(id: number): void {
    this.estudiantesService.deleteEstudiante(id).subscribe(() => {
      this.estudiantesDataSource.data = this.estudiantesDataSource.data.filter(e => e.id !== id);
    });
  }
}