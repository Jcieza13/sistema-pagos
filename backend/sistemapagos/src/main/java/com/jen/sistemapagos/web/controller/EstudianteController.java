package com.jen.sistemapagos.web.controller;

import com.jen.sistemapagos.application.service.EstudianteService;
import com.jen.sistemapagos.domain.model.Estudiante;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/estudiantes")
public class EstudianteController {

    private final EstudianteService estudianteService;

    public EstudianteController(EstudianteService estudianteService) {
        this.estudianteService = estudianteService;
    }

    @Operation(
            summary = "Listar todos los estudiantes",
            description = "Devuelve la lista completa de estudiantes registrados en el sistema."
    )
    @ApiResponse(responseCode = "200", description = "Lista obtenida correctamente")
    @GetMapping
    public List<Estudiante> listar() {
        return estudianteService.listarEstudiantes();
    }

    @Operation(
            summary = "Registrar estudiante (JSON)",
            description = "Crea un nuevo estudiante enviando los datos en formato JSON."
    )
    @ApiResponse(responseCode = "201", description = "Estudiante registrado correctamente")
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public Estudiante crearJson(
            @Parameter(description = "Objeto estudiante en formato JSON") @RequestBody Estudiante estudiante) {
        return estudianteService.registrarEstudiante(estudiante);
    }

    @Operation(
            summary = "Registrar estudiante (Multipart)",
            description = "Crea un nuevo estudiante enviando los datos junto con un archivo opcional (ej. foto)."
    )
    @ApiResponse(responseCode = "201", description = "Estudiante registrado correctamente")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Estudiante> crearMultipart(
            @Parameter(description = "Código único del estudiante") @RequestParam String codigo,
            @Parameter(description = "Nombre del estudiante") @RequestParam String nombre,
            @Parameter(description = "Apellido del estudiante") @RequestParam String apellido,
            @Parameter(description = "Programa académico ID") @RequestParam String programaId,
            @Parameter(description = "Archivo opcional (foto)") @RequestParam(required = false) MultipartFile file
    ) throws IOException {

        Estudiante estudiante = new Estudiante();
        estudiante.setCodigo(codigo);
        estudiante.setNombre(nombre);
        estudiante.setApellido(apellido);
        estudiante.setProgramaId(programaId);

        if (file != null && !file.isEmpty()) {
            String fileName = file.getOriginalFilename();
            if (fileName == null || fileName.isBlank()) {
                fileName = "foto_" + System.currentTimeMillis() + ".png";
            }

            Path uploadPath = Paths.get("uploads");
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath);

            estudiante.setFoto(fileName);
        }

        Estudiante saved = estudianteService.registrarEstudiante(estudiante);
        return ResponseEntity.ok(saved);
    }

    @Operation(
            summary = "Obtener estudiante por código",
            description = "Devuelve un estudiante específico según su código único."
    )
    @ApiResponse(responseCode = "200", description = "Estudiante encontrado")
    @ApiResponse(responseCode = "404", description = "Estudiante no encontrado")
    @GetMapping("/{codigo}")
    public Estudiante obtenerPorCodigo(
            @Parameter(description = "Código único del estudiante") @PathVariable String codigo) {
        return estudianteService.obtenerPorCodigo(codigo);
    }

    @Operation(
            summary = "Eliminar estudiante",
            description = "Elimina un estudiante del sistema según su ID."
    )
    @ApiResponse(responseCode = "204", description = "Estudiante eliminado correctamente")
    @DeleteMapping("/{id}")
    public void eliminar(
            @Parameter(description = "ID único del estudiante") @PathVariable Long id) {
        estudianteService.eliminarEstudiante(id);
    }
}