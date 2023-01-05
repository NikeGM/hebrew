import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Edit, Main } from '../pages';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

function App() {
  return (
    <div className="">
      <DndProvider backend={TouchBackend}>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/edit" element={<Edit/>}/>
          </Routes>
        </BrowserRouter>
      </DndProvider>
    </div>
  );
}

export default App;