import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import VerPedidos from './pages/VerPedidos'


function App() {  

  return (
    <BrowserRouter>      
      <Routes>
        <Route path="/" element={<Navigate to="/ver"/>} />
        <Route path="/ver" element={<VerPedidos/>}/>
      </Routes>
    
    </BrowserRouter>
  )
}

export default App