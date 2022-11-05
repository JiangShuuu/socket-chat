import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MenuProvider } from './context/MenuContext'
import Index from './pages/index'

function App() {
  return (
    <MenuProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />}></Route>
        </Routes>
      </BrowserRouter>
    </MenuProvider>
  );
}

export default App;
