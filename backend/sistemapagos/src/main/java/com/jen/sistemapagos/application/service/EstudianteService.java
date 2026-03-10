package com.jen.sistemapagos.application.service;

import com.jen.sistemapagos.domain.model.Estudiante;
import com.jen.sistemapagos.infrastructure.repository.EstudianteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EstudianteService {

    private final EstudianteRepository estudianteRepository;

    public EstudianteService(EstudianteRepository estudianteRepository) {
        this.estudianteRepository = estudianteRepository;
    }

    // ✅ Listar todos los estudiantes
    public List<Estudiante> listarEstudiantes() {
        return estudianteRepository.findAll();
    }

    // ✅ Registrar estudiante
    public Estudiante registrarEstudiante(Estudiante estudiante) {
        return estudianteRepository.save(estudiante);
    }

    // ✅ Obtener estudiante por código
    public Estudiante obtenerPorCodigo(String codigo) {
        return estudianteRepository.findByCodigo(codigo)
                .orElseThrow(() -> new RuntimeException("Estudiante no encontrado"));
    }

    // ✅ Eliminar estudiante por ID
    public void eliminarEstudiante(Long id) {
        estudianteRepository.deleteById(id);
    }

    // ✅ Nuevo: Obtener estudiante por ID (para descargar archivo)
    public Optional<Estudiante> obtenerPorId(Long id) {
        return estudianteRepository.findById(id);
    }
}