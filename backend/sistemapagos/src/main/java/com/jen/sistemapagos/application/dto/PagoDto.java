package com.jen.sistemapagos.application.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PagoDto {
    private Long id;
    private Double monto;
    private String fecha;
    private String estado;
    private String tipo;
    private String codigoEstudiante;
    private String file;
}