import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estudiante } from '../models/estudiante.model';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {
  private apiUrl = 'http://localhost:8080/estudiantes';

  constructor(private http: HttpClient) {}

  // Obtener todos los estudiantes
  getAllEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.apiUrl);
  }

  // Obtener estudiante por código
  getEstudianteByCodigo(codigo: string): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.apiUrl}/${codigo}`);
  }


  // Crear estudiante con JSON (sin archivo)
createEstudianteJson(estudiante: Estudiante): Observable<Estudiante> {
  return this.http.post<Estudiante>(this.apiUrl, estudiante);
}

// Crear nuevo estudiante con archivo (multipart/form-data)
createEstudiante(formData: FormData): Observable<Estudiante> {
  return this.http.post<Estudiante>(this.apiUrl, formData);
}

  // Actualizar estudiante
  updateEstudiante(id: number, estudiante: Estudiante): Observable<Estudiante> {
    return this.http.put<Estudiante>(`${this.apiUrl}/${id}`, estudiante);
  }

  // Eliminar estudiante
  deleteEstudiante(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}