package com.jen.sistemapagos.application.dto;

import lombok.*;
import java.time.LocalDate;
import com.jen.sistemapagos.domain.enums.TipoPago;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewPagoDto {
    private Double monto;
    private TipoPago tipo;
    private LocalDate fecha;
    private String codigoEstudiante;
}