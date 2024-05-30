import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store/todoSlice';
import { TextField, Button, Container, Typography, Box, Checkbox, FormControlLabel } from '@mui/material';
import { toast } from 'react-toastify';

const AddTodoForm = () => {
    const [description, setDescription] = useState('');
    const [activo, setActivo] = useState(true); // Inicializar en true
    const dispatch = useDispatch();

    const getCurrentDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const onDescriptionChanged = (e) => setDescription(e.target.value);
    const onActivoChanged = (e) => setActivo(e.target.checked);

    const onSaveTodoClicked = () => {
        if (description.trim() === '') {
            toast.error('La descripción de la tarea es obligatoria');
            return;
        }
        dispatch(addTodo({
            description: description.trim(),
            completed: false,
            fechaCreacionTareaDTO: getCurrentDateTime(),
            activoTareaDTO: activo
        }));
        setDescription('');
        setActivo(true);
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Agregar Nueva Tarea
                </Typography>
                <TextField
                    label="Descripción de la Tarea"
                    placeholder="Descripción de la Tarea"
                    fullWidth
                    variant="outlined"
                    value={description}
                    onChange={onDescriptionChanged}
                    required
                    sx={{ mb: 2 }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onSaveTodoClicked}
                        sx={{ mr: 2 }}
                    >
                        Guardar Tarea
                    </Button>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={activo}
                                onChange={onActivoChanged}
                            />
                        }
                        label="Activo"
                    />
                </Box>
            </Box>
        </Container>
    );
};

export default AddTodoForm;
