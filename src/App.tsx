import './App.css'
import { BrowserRouter } from 'react-router-dom'

// Components
import HomePage from './pages/HomePage'


function App() {

  return (
    <BrowserRouter>
      <HomePage></HomePage>
    </BrowserRouter>
  )
}

export default App
