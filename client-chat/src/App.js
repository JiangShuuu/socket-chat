import { BrowserRouter, Routes, Route } from 'react-router-dom'

import ContextUseIndex from './pages/index'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContextUseIndex />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
