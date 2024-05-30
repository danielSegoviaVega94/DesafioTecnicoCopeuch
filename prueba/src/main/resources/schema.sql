CREATE TABLE IF NOT EXISTS tareas (
    id_tarea BIGINT AUTO_INCREMENT PRIMARY KEY,
    descripcion_tarea VARCHAR(255),
    fecha_creacion_tarea TIMESTAMP,
    activo BOOLEAN
);
