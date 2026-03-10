package com.jen.sistemapagos.infrastructure.exception;

public class EstudianteNotFoundException extends RuntimeException {
    public EstudianteNotFoundException(String codigo) {
        super("Estudiante con código " + codigo + " no encontrado");
    }
}
