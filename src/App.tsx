import './App.css';

import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MonolithGraph } from './components/MonolithGraph';
import { DecompositionGraph } from './components/DecompositionGraph';
import { Decomposition } from './components/Decomposition';

const Overview = () => {
  return (
    <>
      <Header></Header>
      <Dashboard></Dashboard>
    </>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Overview></Overview>} />
        <Route path="/monolith/graph" element={<MonolithGraph></MonolithGraph>} />
        <Route path="/decomposition/graph" element={<DecompositionGraph></DecompositionGraph>} />
        <Route path="/visualization/:decompositionId" element={<Decomposition></Decomposition>} />
      </Routes>
    </Router>
  );
}

export default App;
