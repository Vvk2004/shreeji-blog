import './App.css';
import Listing from './Listing';
import Form from './Form';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Listing />} />
        <Route path='/add-blog' element={<Form />} />
      </Routes>
    </>
  );
}

export default App;
