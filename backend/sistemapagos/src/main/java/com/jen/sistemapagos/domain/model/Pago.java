package com.jen.sistemapagos.domain.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.jen.sistemapagos.domain.enums.EstadoPago;
import com.jen.sistemapagos.domain.enums.TipoPago;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Entidad que representa un pago realizado por un estudiante")
public class Pago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Identificador único del pago (autogenerado)", example = "10")
    private Long id;

    @Schema(description = "Monto del pago en pesos chilenos", example = "150000")
    private Double monto;

    @Schema(description = "Fecha en que se realizó el pago", example = "2026-03-09")
    private LocalDate fecha;

    @Schema(description = "Nombre del archivo comprobante o recibo interno", example = "comprobante_123.pdf")
    private String file;

    @Enumerated(EnumType.STRING)
    @Schema(description = "Estado actual del pago", example = "CREADO")
    private EstadoPago estado;

    @Enumerated(EnumType.STRING)
    @Schema(description = "Tipo de pago realizado", example = "MENSUALIDAD")
    private TipoPago tipo;

    @ManyToOne
    @JoinColumn(name = "estudiante_id")
    @JsonManagedReference
    @Schema(description = "Estudiante asociado a este pago")
    private Estudiante estudiante;
}