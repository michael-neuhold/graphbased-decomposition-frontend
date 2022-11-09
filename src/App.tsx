import './App.css';

import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import ReactDOM from 'react-dom';
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


{/*

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const Example = () => <p>Example Komponente</p>;

const App = () => {
  return (
    
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

  nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D, globalScale: any) => {
    const label = node.id;
    const fontSize = 12/globalScale;
    ctx.font = `${fontSize}px Sans-Serif`;
    const textWidth = ctx.measureText(label).width;
    const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding
    ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
    
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = node.color;
    ctx.fillText(label, node.x, node.y);

    node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
  }}
*/}