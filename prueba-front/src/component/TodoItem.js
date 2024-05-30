import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeTodo, editTodo } from '../store/todoSlice';
import { TextField, Button, Checkbox, FormControlLabel, Box, Typography, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const TodoItem = ({ todo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState(todo.descriptionTareaDTO || '');
    const [activo, setActivo] = useState(todo.activoTareaDTO || false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isEditing) {
            setDescription(todo.descriptionTareaDTO);
            setActivo(todo.activoTareaDTO);
        }
    }, [isEditing, todo.descriptionTareaDTO, todo.activoTareaDTO]);

    const handleDelete = () => {
        confirmAlert({
            title: 'Confirmar eliminación',
            message: '¿Está seguro que desea eliminar esta tarea?',
            buttons: [
                {
                    label: 'Sí',
                    onClick: () => dispatch(removeTodo(todo.idTareaDTO))
                },
                {
                    label: 'No'
                }
            ]
        });
    };

    const handleEdit = () => {
        if (description.trim() === '') {
            toast.error('La descripción de la tarea es obligatoria');
            return;
        }
        dispatch(editTodo({
            idTareaDTO: todo.idTareaDTO,
            descriptionTareaDTO: description.trim(),
            activoTareaDTO: activo
        }));
        setIsEditing(false);
    };

    return (
        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            {isEditing ? (
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                            label="Descripción de la Tarea"
                            placeholder="Descripción de la Tarea"
                            fullWidth
                            variant="outlined"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleEdit}
                            sx={{ ml: 2 }}
                        >
                            Guardar
                        </Button>
                    </Box>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={activo}
                                onChange={(e) => setActivo(e.target.checked)}
                            />
                        }
                        label="Activo"
                        placeholder="Activo"
                        sx={{ mt: 2 }}
                    />
                </Box>
            ) : (
                <Box>
                    <Typography variant="body1">{todo.descriptionTareaDTO}</Typography>
                    <Typography variant="body2">{todo.activoTareaDTO ? 'Activo' : 'Inactivo'}</Typography>
                    <Typography variant="body2">Creado el: {todo.fechaCreacionTareaDTO}</Typography>
                    <Button
                        variant="contained"
                        onClick={() => setIsEditing(true)}
                        sx={{ mt: 1 }}
                    >
                        Editar
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleDelete}
                        sx={{ mt: 1, ml: 1 }}
                    >
                        Eliminar
                    </Button>
                </Box>
            )}
        </Paper>
    );
};

export default TodoItem;
