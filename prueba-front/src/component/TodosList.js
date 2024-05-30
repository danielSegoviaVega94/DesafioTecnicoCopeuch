import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos } from '../store/todoSlice';
import TodoItem from './TodoItem';
import { Container, Typography, Box, Grid, CircularProgress } from '@mui/material';

const TodosList = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos.items);
    const todoStatus = useSelector((state) => state.todos.status);
    const error = useSelector((state) => state.todos.error);

    useEffect(() => {
        if (todoStatus === 'idle') {
            dispatch(fetchTodos());
        }
    }, [todoStatus, dispatch]);

    let activeTodos = [];
    let inactiveTodos = [];

    if (todoStatus === 'succeeded') {
        activeTodos = todos.filter(todo => todo.activoTareaDTO);
        inactiveTodos = todos.filter(todo => !todo.activoTareaDTO);
    }

    let content;

    if (todoStatus === 'loading') {
        content = <CircularProgress />;
    } else if (todoStatus === 'succeeded') {
        content = (
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Tareas Activas
                    </Typography>
                    {activeTodos.map((todo) => (
                        <TodoItem key={todo.idTareaDTO} todo={todo} />
                    ))}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Tareas Inactivas
                    </Typography>
                    {inactiveTodos.map((todo) => (
                        <TodoItem key={todo.idTareaDTO} todo={todo} />
                    ))}
                </Grid>
            </Grid>
        );
    } else if (todoStatus === 'failed') {
        content = <Typography color="error">{error}</Typography>;
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Lista de Tareas
                </Typography>
                {content}
            </Box>
        </Container>
    );
};

export default TodosList;
