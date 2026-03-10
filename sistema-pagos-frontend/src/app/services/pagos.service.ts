import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Pago } from '../models/pago.model';

@Injectable({
  providedIn: 'root',
})
export class PagosService {
  private apiUrl = 'http://localhost:8080/pagos';

  constructor(private http: HttpClient) {}

  // Obtener todos los pagos (para admin-pagos)
  getAllPagos(): Observable<Pago[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((pagos) =>
        pagos.map((p) => ({
          ...p,
          fecha: new Date(p.fecha), // convertir string a Date
          fileName: p.fileName ?? p.file ?? undefined, // compatibilidad si backend aún envía 'file'
          fileUrl: p.fileUrl ?? (p.file ? `/uploads/${p.file}` : undefined),
        })),
      ),
    );
  }

  // Actualizar estado de un pago (aprobar/rechazar)
updateEstado(pagoId: number, nuevoEstado: string): Observable<Pago> {
  return this.http
    .put<any>(`${this.apiUrl}/${pagoId}/estado?estado=${nuevoEstado}`, {})
    .pipe(
      map((p) => ({
        ...p,
        fecha: new Date(p.fecha),
        fileName: p.fileName ?? p.file ?? undefined,
        fileUrl: p.fileUrl ?? (p.file ? `/uploads/${p.file}` : undefined),
      }))
    );
}

  // Crear un nuevo pago (multipart/form-data)
  createPago(formData: FormData): Observable<Pago> {
    return this.http.post<any>(this.apiUrl, formData).pipe(
      map((p) => ({
        ...p,
        fecha: new Date(p.fecha),
        fileName: p.fileName ?? p.file ?? undefined,
        fileUrl: p.fileUrl ?? (p.file ? `/uploads/${p.file}` : undefined),
      })),
    );
  }

  // Obtener pagos de un estudiante específico por su código (string)
  getPagosDeEstudiante(codigoEstudiante: string): Observable<Pago[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/codigo/${codigoEstudiante}`)
      .pipe(
        map((pagos) =>
          pagos.map((p) => ({
            ...p,
            fecha: new Date(p.fecha), // convertir string a Date
            fileName: p.fileName ?? p.file ?? undefined,
            fileUrl: p.fileUrl ?? (p.file ? `/uploads/${p.file}` : undefined),
          })),
        ),
      );
  }

}
