package com.dsegovia.prueba.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TareaDTO {
    private Long idTareaDTO;
    private String descriptionTareaDTO;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime fechaCreacionTareaDTO;
    private Boolean activoTareaDTO;
}
