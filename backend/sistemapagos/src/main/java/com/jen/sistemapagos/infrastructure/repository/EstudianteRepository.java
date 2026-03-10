package com.jen.sistemapagos.infrastructure.repository;

import com.jen.sistemapagos.domain.model.Estudiante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EstudianteRepository  extends JpaRepository<Estudiante, Long> {
    // ✅ Buscar estudiante por código único
    Optional<Estudiante> findByCodigo(String codigo);

}
