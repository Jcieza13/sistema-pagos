package com.jen.sistemapagos.infrastructure.exception;

public class PagoNotFoundException extends RuntimeException {
    public PagoNotFoundException(Long id) {
        super("Pago con id " + id + " no encontrado");
    }

}
