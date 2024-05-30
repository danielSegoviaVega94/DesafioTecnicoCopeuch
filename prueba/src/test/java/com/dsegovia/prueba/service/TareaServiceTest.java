package com.dsegovia.prueba.service;

import com.dsegovia.prueba.dto.TareaDTO;
import com.dsegovia.prueba.exception.TareaException;
import com.dsegovia.prueba.mapper.TareaMapper;
import com.dsegovia.prueba.model.Tarea;
import com.dsegovia.prueba.repository.TareaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
public class TareaServiceTest {
    @InjectMocks
    private TareaService tareaService;

    @Mock
    private TareaRepository tareaRepository;

    @Mock
    private TareaMapper tareaMapper;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testListarTareas() {
        Tarea tarea = new Tarea(1L, "Descripción", null, true);
        TareaDTO tareaDTO = new TareaDTO(1L, "Descripción", LocalDateTime.now(), true);

        when(tareaRepository.findAll()).thenReturn(Arrays.asList(tarea));
        when(tareaMapper.toDto(tarea)).thenReturn(tareaDTO);

        List<TareaDTO> tareas = tareaService.listarTareas();

        assertNotNull(tareas);
        assertEquals(1, tareas.size());
        assertEquals(tareaDTO, tareas.get(0));
    }

    @Test
    public void testAgregarTarea() {
        TareaDTO tareaDTO = new TareaDTO(1L, "Descripción",LocalDateTime.now(), true);
        Tarea tarea = new Tarea(1L, "Descripción",LocalDateTime.now(), true);

        when(tareaMapper.toEntity(tareaDTO)).thenReturn(tarea);
        when(tareaRepository.save(tarea)).thenReturn(tarea);
        when(tareaMapper.toDto(tarea)).thenReturn(tareaDTO);

        TareaDTO result = tareaService.agregarTarea(tareaDTO);

        assertNotNull(result);
        assertEquals(tareaDTO, result);
    }

    @Test
    public void testObtenerTareaPorId() {
        Tarea tarea = new Tarea(1L, "Descripción", null, true);
        TareaDTO tareaDTO = new TareaDTO(1L, "Descripción",LocalDateTime.now(), true);

        when(tareaRepository.findById(1L)).thenReturn(Optional.of(tarea));
        when(tareaMapper.toDto(tarea)).thenReturn(tareaDTO);

        TareaDTO result = tareaService.obtenerTareaPorId(1L);

        assertNotNull(result);
        assertEquals(tareaDTO, result);
    }

    @Test
    public void testObtenerTareaPorId_NotFound() {
        when(tareaRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(TareaException.class, () -> {
            tareaService.obtenerTareaPorId(1L);
        });

        String expectedMessage = "Tarea con id 1 no encontrada";
        String actualMessage = exception.getMessage();

        assertTrue(actualMessage.contains(expectedMessage));
    }

    @Test
    public void testEditarTarea() {
        Tarea tarea = new Tarea(1L, "Descripción", null, true);
        TareaDTO tareaDTO = new TareaDTO(1L, "Descripción",LocalDateTime.now(), true);

        when(tareaRepository.findById(1L)).thenReturn(Optional.of(tarea));
        when(tareaMapper.toEntity(tareaDTO)).thenReturn(tarea);
        when(tareaRepository.save(tarea)).thenReturn(tarea);
        when(tareaMapper.toDto(tarea)).thenReturn(tareaDTO);

        TareaDTO result = tareaService.editarTarea(1L, tareaDTO);

        assertNotNull(result);
        assertEquals(tareaDTO, result);
    }

    @Test
    public void testEditarTarea_NotFound() {
        TareaDTO tareaDTO = new TareaDTO(1L, "Descripción",LocalDateTime.now(), true);

        when(tareaRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(TareaException.class, () -> {
            tareaService.editarTarea(1L, tareaDTO);
        });

        String expectedMessage = "No se puede editar. Tarea con id 1 no encontrada";
        String actualMessage = exception.getMessage();

        assertTrue(actualMessage.contains(expectedMessage));
    }

    @Test
    public void testEliminarTarea() {
        when(tareaRepository.existsById(1L)).thenReturn(true);

        doNothing().when(tareaRepository).deleteById(1L);

        assertDoesNotThrow(() -> {
            tareaService.eliminarTarea(1L);
        });

        verify(tareaRepository, times(1)).deleteById(1L);
    }

    @Test
    public void testEliminarTarea_NotFound() {
        when(tareaRepository.existsById(1L)).thenReturn(false);

        Exception exception = assertThrows(TareaException.class, () -> {
            tareaService.eliminarTarea(1L);
        });

        String expectedMessage = "No se puede eliminar. Tarea con id 1 no encontrada";
        String actualMessage = exception.getMessage();

        assertTrue(actualMessage.contains(expectedMessage));
    }
}
