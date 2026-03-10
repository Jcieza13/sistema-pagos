import { Estudiante } from './estudiante.model';

export interface Pago {
  id: number;
  monto: number;          // cantidad del pago
  fecha: Date;            // tipado como objeto Date
  tipo: PaymentType;      // enum: EFECTIVO, CHEQUE, TRANSFERENCIA, DEPOSITO
  estado: PaymentStatus;  // enum: CREADO, VALIDADO, RECHAZADO
  fileName?: string;      // nombre del archivo asociado
  fileUrl?: string;       // URL o ruta para descarga
  estudiante?: Estudiante;
}

export enum PaymentType {
  EFECTIVO = 'EFECTIVO',
  CHEQUE = 'CHEQUE',
  TRANSFERENCIA = 'TRANSFERENCIA',
  DEPOSITO = 'DEPOSITO'
}

export enum PaymentStatus {
  CREADO = 'CREADO',
  VALIDADO = 'VALIDADO',
  RECHAZADO = 'RECHAZADO'
}