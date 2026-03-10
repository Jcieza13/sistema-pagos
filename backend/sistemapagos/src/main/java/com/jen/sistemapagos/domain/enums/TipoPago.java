package com.jen.sistemapagos.domain.enums;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Tipos de pago aceptados dentro del sistema")
public enum TipoPago {

    @Schema(description = "Pago realizado en efectivo")
    EFECTIVO,

    @Schema(description = "Pago realizado mediante cheque")
    CHEQUE,

    @Schema(description = "Pago realizado mediante transferencia bancaria")
    TRANSFERENCIA,

    @Schema(description = "Pago realizado mediante depósito en cuenta")
    DEPOSITO
}