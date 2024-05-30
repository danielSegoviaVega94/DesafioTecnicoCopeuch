import React from 'react';
import AddTodoForm from './component/AddTodoForm';
import TodosList from './component/TodosList';
import { Container, Typography, Box } from '@mui/material';

function App() {
    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Gestión de Tareas
                </Typography>
                <AddTodoForm />
                <TodosList />
            </Box>
        </Container>
    );
}

export default App;
