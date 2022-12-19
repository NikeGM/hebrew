import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Edit, Main } from '../pages';

function App() {
  return (
    <div className="">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/edit" element={<Edit/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;