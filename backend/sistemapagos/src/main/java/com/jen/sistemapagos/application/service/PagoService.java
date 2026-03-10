package com.jen.sistemapagos.application.service;

import com.jen.sistemapagos.domain.enums.EstadoPago;
import com.jen.sistemapagos.domain.enums.TipoPago;
import com.jen.sistemapagos.domain.model.Estudiante;
import com.jen.sistemapagos.domain.model.Pago;
import com.jen.sistemapagos.infrastructure.repository.EstudianteRepository;
import com.jen.sistemapagos.infrastructure.repository.PagoRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;

@Service
public class PagoService {

    private final PagoRepository pagoRepository;
    private final EstudianteRepository estudianteRepository;

    public PagoService(PagoRepository pagoRepository, EstudianteRepository estudianteRepository) {
        this.pagoRepository = pagoRepository;
        this.estudianteRepository = estudianteRepository;
    }

    // ✅ Guardar pago con comprobante
    public Pago savePago(MultipartFile file, double monto, TipoPago tipo, LocalDate fecha, String codigoEstudiante) throws IOException {
        String comprobanteNombre;

        if (file != null && !file.isEmpty()) {
            comprobanteNombre = file.getOriginalFilename();
            if (comprobanteNombre == null || comprobanteNombre.isBlank()) {
                comprobanteNombre = "comprobante_" + System.currentTimeMillis() + ".pdf";
            }

            Path uploadPath = Paths.get("uploads");
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Files.copy(file.getInputStream(), uploadPath.resolve(comprobanteNombre));
        } else if (tipo == TipoPago.EFECTIVO) {
            // Generar comprobante interno si es efectivo y no se adjunta archivo
            comprobanteNombre = "REC-" + System.currentTimeMillis();
        } else {
            throw new IllegalArgumentException("Debe adjuntar comprobante para pagos no efectivos");
        }

        // Buscar estudiante por código
        Estudiante estudiante = estudianteRepository.findByCodigo(codigoEstudiante)
                .orElseThrow(() -> new RuntimeException("Estudiante no encontrado"));

        Pago pago = new Pago();
        pago.setFile(comprobanteNombre); // 👈 usamos el campo correcto
        pago.setMonto(150000.0);
        pago.setTipo(tipo);
        pago.setFecha(fecha);
        pago.setEstado(EstadoPago.CREADO); // 👈 estado inicial según tu enum
        pago.setEstudiante(estudiante);

        return pagoRepository.save(pago);
    }

    // ✅ Buscar pagos por estudiante
    public List<Pago> findByEstudianteId(Long estudianteId) {
        return pagoRepository.findByEstudianteId(estudianteId);
    }

    // ✅ Actualizar estado de pago
    public Pago actualizarPagoPorStatus(EstadoPago estado, Long pagoId) {
        Pago pago = pagoRepository.findById(pagoId)
                .orElseThrow(() -> new RuntimeException("Pago no encontrado"));
        pago.setEstado(estado);
        return pagoRepository.save(pago);
    }


    public double calcularDeudaMensualidad(String codigoEstudiante) {
        double montoMensualidad = 150000; // 👈 valor fijo o configurable
        List<Pago> pagosValidados = pagoRepository.findByEstudianteCodigoAndEstado(codigoEstudiante, EstadoPago.VALIDADO);
        double totalPagado = pagosValidados.stream().mapToDouble(Pago::getMonto).sum();
        return montoMensualidad - totalPagado;
    }
}