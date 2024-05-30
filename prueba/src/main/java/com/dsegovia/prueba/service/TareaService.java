package com.dsegovia.prueba.service;

import com.dsegovia.prueba.dto.TareaDTO;
import com.dsegovia.prueba.exception.TareaException;
import com.dsegovia.prueba.mapper.TareaMapper;
import com.dsegovia.prueba.model.Tarea;
import com.dsegovia.prueba.repository.TareaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TareaService {

    @Autowired
    private TareaRepository tareaRepository;

    @Autowired
    private TareaMapper tareaMapper;

    public List<TareaDTO> listarTareas() {
        try {
            return tareaRepository.findAll().stream()
                    .map(tareaMapper::toDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new TareaException("Error al listar todas las tareas: " + e.getMessage());
        }
    }

    public List<TareaDTO> listarTareasActivas() {
        try {
            return tareaRepository.findByActivoTrue().stream()
                    .map(tareaMapper::toDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new TareaException("Error al listar tareas activas: " + e.getMessage());
        }
    }

    public TareaDTO agregarTarea(TareaDTO tareaDTO) {
        try {
            if (tareaDTO.getDescriptionTareaDTO() == null) {
                throw new TareaException("La descripción de la tarea no puede ser nula");
            }
            Tarea tarea = tareaMapper.toEntity(tareaDTO);
            Tarea nuevaTarea = tareaRepository.save(tarea);
            return tareaMapper.toDto(nuevaTarea);
        } catch (Exception e) {
            throw new TareaException("Error al agregar tarea: " + e.getMessage());
        }
    }

    public TareaDTO obtenerTareaPorId(Long id) {
        try {
            return tareaRepository.findById(id)
                    .map(tareaMapper::toDto)
                    .orElseThrow(() -> new TareaException("Tarea con id " + id + " no encontrada"));
        } catch (Exception e) {
            throw new TareaException("Error al obtener tarea: " + e.getMessage());
        }
    }

    public TareaDTO editarTarea(Long id, TareaDTO tareaDTO) {
        try {
            return tareaRepository.findById(id).map(tareaExistente -> {
                if (tareaDTO.getDescriptionTareaDTO() == null) {
                    throw new TareaException("La descripción de la tarea no puede ser nula");
                }
                Tarea tarea = tareaMapper.toEntity(tareaDTO);
                tarea.setIdTarea(id);
                return tareaMapper.toDto(tareaRepository.save(tarea));
            }).orElseThrow(() -> new TareaException("No se puede editar. Tarea con id " + id + " no encontrada"));
        } catch (Exception e) {
            throw new TareaException("Error al editar tarea: " + e.getMessage());
        }
    }

    public void eliminarTarea(Long id) {
        try {
            if (!tareaRepository.existsById(id)) {
                throw new TareaException("No se puede eliminar. Tarea con id " + id + " no encontrada");
            }
            tareaRepository.deleteById(id);
        } catch (Exception e) {
            throw new TareaException("Error al eliminar tarea: " + e.getMessage());
        }
    }
}
