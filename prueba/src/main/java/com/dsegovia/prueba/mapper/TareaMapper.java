package com.dsegovia.prueba.mapper;

import com.dsegovia.prueba.dto.TareaDTO;
import com.dsegovia.prueba.model.Tarea;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TareaMapper {
    @Mapping(source = "idTarea", target = "idTareaDTO")
    @Mapping(source = "descripcionTarea", target = "descriptionTareaDTO")
    @Mapping(source = "fechaCreacionTarea",target = "fechaCreacionTareaDTO")
    @Mapping(source = "activo", target = "activoTareaDTO")
    TareaDTO toDto(Tarea tarea);
    
    @Mapping(source = "idTareaDTO", target = "idTarea")
    @Mapping(source = "descriptionTareaDTO", target = "descripcionTarea")
    @Mapping(source = "fechaCreacionTareaDTO", target = "fechaCreacionTarea")
    @Mapping(source = "activoTareaDTO", target = "activo")
    Tarea toEntity(TareaDTO tareaDTO);
}
