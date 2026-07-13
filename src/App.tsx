import { useState } from 'react'
import './App.css'
import { Box, Container } from '@mui/material'
import HomePage from './pages/HomePage'
import NavBar from './components/NavBar'
import CreateRecipe from './components/recipes/CreateRecipe'
import { BrowserRouter } from 'react-router-dom'


function App() {
  const [isNewRecipeModalOpen, setIsNewRecipeMomdalOpen] = useState(false);

  return (
    <BrowserRouter>
      <Container maxWidth='lg' >
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}>
          <NavBar onNewClick={() => { setIsNewRecipeMomdalOpen(true) }} />
          <HomePage />
        </Box>
        <CreateRecipe isOpen={isNewRecipeModalOpen}
          onClose={() => setIsNewRecipeMomdalOpen(false)}
          onCreated={() => { }} />
      </Container>
    </BrowserRouter>
  )
}

export default App
