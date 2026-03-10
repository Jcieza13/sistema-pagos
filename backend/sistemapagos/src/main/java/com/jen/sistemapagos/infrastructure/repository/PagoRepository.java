package com.jen.sistemapagos.infrastructure.repository;

import com.jen.sistemapagos.domain.enums.EstadoPago;
import com.jen.sistemapagos.domain.enums.TipoPago;
import com.jen.sistemapagos.domain.model.Pago;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface PagoRepository extends JpaRepository<Pago, Long> {

    // ✅ Buscar pagos por código de estudiante
    List<Pago> findByEstudianteCodigo(String codigo);

    // Busca todos los pagos por ID de estudiante
    List<Pago> findByEstudianteId(Long estudianteId);
    // ✅ Buscar pagos validados por código de estudiante
    List<Pago> findByEstudianteCodigoAndEstado(String codigo, EstadoPago estado);



}


