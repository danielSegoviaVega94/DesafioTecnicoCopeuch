package com.dsegovia.prueba.repository;

import com.dsegovia.prueba.model.Tarea;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TareaRepository extends JpaRepository<Tarea, Long> {
    List<Tarea> findByActivoTrue();

}
