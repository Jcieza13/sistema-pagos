package com.jen.sistemapagos.web.controller;

import com.jen.sistemapagos.domain.enums.EstadoPago;
import com.jen.sistemapagos.domain.enums.TipoPago;
import com.jen.sistemapagos.domain.model.Pago;
import com.jen.sistemapagos.infrastructure.repository.PagoRepository;
import com.jen.sistemapagos.application.service.PagoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/pagos")
public class PagoController {

    private final PagoRepository pagoRepository;
    private final PagoService pagoService;

    public PagoController(PagoRepository pagoRepository, PagoService pagoService) {
        this.pagoRepository = pagoRepository;
        this.pagoService = pagoService;
    }

    @Operation(
            summary = "Listar todos los pagos",
            description = "Devuelve la lista completa de pagos registrados en el sistema."
    )
    @ApiResponse(responseCode = "200", description = "Lista obtenida correctamente")
    @GetMapping
    public ResponseEntity<List<Pago>> listarPagos() {
        return ResponseEntity.ok(pagoRepository.findAll());
    }

    @Operation(
            summary = "Obtener pago por ID",
            description = "Devuelve un pago específico según su identificador único."
    )
    @ApiResponse(responseCode = "200", description = "Pago encontrado")
    @ApiResponse(responseCode = "404", description = "Pago no encontrado")
    @GetMapping("/{id}")
    public ResponseEntity<Pago> listarPagoPorId(
            @Parameter(description = "ID único del pago") @PathVariable Long id) {
        return pagoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(
            summary = "Listar pagos de un estudiante por ID",
            description = "Devuelve todos los pagos asociados a un estudiante según su ID."
    )
    @ApiResponse(responseCode = "200", description = "Lista obtenida correctamente")
    @GetMapping("/estudiante/{id}")
    public ResponseEntity<List<Pago>> getPagosByEstudiante(
            @Parameter(description = "ID único del estudiante") @PathVariable Long id) {
        return ResponseEntity.ok(pagoService.findByEstudianteId(id));
    }

    @Operation(
            summary = "Listar pagos de un estudiante por código",
            description = "Devuelve todos los pagos asociados a un estudiante según su código único."
    )
    @ApiResponse(responseCode = "200", description = "Lista obtenida correctamente")
    @GetMapping("/codigo/{codigo}")
    public ResponseEntity<List<Pago>> listarPagosPorCodigoEstudiante(
            @Parameter(description = "Código único del estudiante") @PathVariable String codigo) {
        return ResponseEntity.ok(pagoRepository.findByEstudianteCodigo(codigo));
    }

    @Operation(
            summary = "Actualizar estado de un pago",
            description = "Permite al administrador cambiar el estado de un pago (ej. PENDIENTE → VALIDADO)."
    )
    @ApiResponse(responseCode = "200", description = "Estado actualizado correctamente")
    @ApiResponse(responseCode = "404", description = "Pago no encontrado")
    @PutMapping("/{pagoId}/estado")
    public ResponseEntity<Pago> actualizarStatusDePago(
            @Parameter(description = "Nuevo estado del pago") @RequestParam EstadoPago estado,
            @Parameter(description = "ID único del pago") @PathVariable Long pagoId) {
        return ResponseEntity.ok(pagoService.actualizarPagoPorStatus(estado, pagoId));
    }

    @Operation(
            summary = "Registrar un nuevo pago",
            description = "Crea un pago asociado a un estudiante, con comprobante opcional."
    )
    @ApiResponse(responseCode = "201", description = "Pago creado correctamente")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Pago> guardarPago(
            @Parameter(description = "Archivo comprobante en PDF") @RequestParam(value = "file", required = false) MultipartFile file,
            @Parameter(description = "Tipo de pago (ej. MENSUALIDAD)") @RequestParam("tipo") String tipo,
            @Parameter(description = "Fecha del pago en formato dd-MM-yyyy") @RequestParam("fecha") String fecha,
            @Parameter(description = "Código único del estudiante") @RequestParam("codigoEstudiante") String codigoEstudiante
    ) throws IOException {

        TipoPago tipoEnum = TipoPago.valueOf(tipo.toUpperCase());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        LocalDate fechaPago = LocalDate.parse(fecha, formatter);

        Pago saved = pagoService.savePago(file, 150000.0, tipoEnum, fechaPago, codigoEstudiante);
        return ResponseEntity.ok(saved);
    }

    @Operation(
            summary = "Calcular deuda de mensualidad",
            description = "Devuelve el monto pendiente de pago de mensualidad para un estudiante según su código."
    )
    @ApiResponse(responseCode = "200", description = "Deuda calculada correctamente")
    @GetMapping("/estudiantes/{codigo}/deuda")
    public ResponseEntity<Double> getDeudaMensualidad(
            @Parameter(description = "Código único del estudiante") @PathVariable String codigo) {
        double deuda = pagoService.calcularDeudaMensualidad(codigo);
        return ResponseEntity.ok(deuda);
    }
}