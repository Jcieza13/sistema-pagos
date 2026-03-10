package com.jen.sistemapagos.domain.enums;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Estados posibles de un pago dentro del sistema")
public enum EstadoPago {

    @Schema(description = "El pago fue creado pero aún no validado")
    CREADO,

    @Schema(description = "El pago fue revisado y validado correctamente")
    VALIDADO,

    @Schema(description = "El pago fue rechazado por inconsistencias o errores")
    RECHAZADO
}