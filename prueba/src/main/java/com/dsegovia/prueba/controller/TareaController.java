package com.dsegovia.prueba.controller;

import com.dsegovia.prueba.dto.TareaDTO;
import com.dsegovia.prueba.exception.TareaException;
import com.dsegovia.prueba.service.TareaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tareas")
@Tag(name = "Gestión de Tareas", description = "Tareas")
public class TareaController {

    @Autowired
    private TareaService tareaService;

    @GetMapping
    @Operation(summary = "Listar todas las tareas")
    public List<TareaDTO> listarTareas() {
        return tareaService.listarTareas();
    }

    @GetMapping("/activas")
    @Operation(summary = "Listar todas las tareas")
    public List<TareaDTO> listarTareasActivas() {
        return tareaService.listarTareasActivas();
    }

    @PostMapping
    @Operation(summary = "Agregar una nueva tarea")
    public ResponseEntity<?> agregarTarea(@RequestBody TareaDTO tareaDTO) {
        try {
            TareaDTO nuevaTarea = tareaService.agregarTarea(tareaDTO);
            return ResponseEntity.ok(nuevaTarea);
        } catch (TareaException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener una tarea por ID")
    public ResponseEntity<?> obtenerTareaPorId(@PathVariable Long id) {
        try {
            TareaDTO tareaDTO = tareaService.obtenerTareaPorId(id);
            return ResponseEntity.ok(tareaDTO);
        } catch (TareaException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    @Operation(summary = "Editar una tarea existente")
    public ResponseEntity<?> editarTarea(@PathVariable Long id, @RequestBody TareaDTO tareaDTO) {
        try {
            TareaDTO tareaActualizada = tareaService.editarTarea(id, tareaDTO);
            return ResponseEntity.ok(tareaActualizada);
        } catch (TareaException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar una tarea")
    public ResponseEntity<?> eliminarTarea(@PathVariable Long id) {
        try {
            tareaService.eliminarTarea(id);
            return ResponseEntity.noContent().build();
        } catch (TareaException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}
