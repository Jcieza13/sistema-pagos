package com.jen.sistemapagos.application.mapper;

import com.jen.sistemapagos.application.dto.NewPagoDto;
import com.jen.sistemapagos.application.dto.PagoDto;
import com.jen.sistemapagos.domain.model.Pago;
import com.jen.sistemapagos.domain.model.Estudiante;
public class PagoMapper {

    // Entidad -> DTO (respuesta)
    public static PagoDto toDto(Pago pago) {
        if (pago == null) return null;

        return PagoDto.builder()
                .id(pago.getId())
                .monto(pago.getMonto())
                .fecha(pago.getFecha() != null ? pago.getFecha().toString() : null)
                .estado(pago.getEstado() != null ? pago.getEstado().name() : null)
                .tipo(pago.getTipo() != null ? pago.getTipo().name() : null)
                .codigoEstudiante(pago.getEstudiante() != null ? pago.getEstudiante().getCodigo() : null)
                .file(pago.getFile())
                .build();
    }

    // NewPagoDto -> Entidad (entrada)
    public static Pago toEntity(NewPagoDto dto, Estudiante estudiante) {
        if (dto == null) return null;

        return Pago.builder()
                .monto(dto.getMonto())
                .fecha(dto.getFecha())
                .tipo(dto.getTipo())
                .estudiante(estudiante)
                .build();
    }
}