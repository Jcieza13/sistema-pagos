package com.jen.sistemapagos.domain.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Entidad que representa a un estudiante dentro del sistema de pagos")
public class Estudiante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Identificador único del estudiante (autogenerado)", example = "1")
    private Long id;

    @Column(unique = true, nullable = false)
    @Schema(description = "Código único asignado al estudiante", example = "STU-2026-001")
    private String codigo;

    @Schema(description = "Nombre del estudiante", example = "Jen")
    private String nombre;

    @Schema(description = "Apellido del estudiante", example = "Doe")
    private String apellido;

    @Schema(description = "Identificador del programa académico", example = "ING-SOFT")
    private String programaId;

    @Schema(description = "Nombre del archivo o URL de la foto asociada al estudiante", example = "foto_123.png")
    private String foto;

    @OneToMany(mappedBy = "estudiante", cascade = CascadeType.ALL)
    @JsonBackReference
    @Schema(description = "Lista de pagos asociados al estudiante")
    private List<Pago> pagos;
}