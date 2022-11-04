import './App.css';

import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';

function App() {

  let [data, setData] = useState(undefined)
  const [controls] = useState({ 'DAG Orientation': 'td'});
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "logicalCoupling": false,
      "semanticCoupling": true,
      "contributorCoupling": false,
      "intervalSeconds": 3600,
    })
  };

  useEffect(() => {
    //fetch("http://localhost:8080/decompositions/decompose/1689/visualization", requestOptions)
    fetch("http://localhost:8080/decompositions/monolith/49511/coupling/visualization", requestOptions)
      .then(response => response.json())
      .then(data => setData(data))
  }, [])

  return (
    <>
      <Header></Header>
      <Dashboard></Dashboard>
    </>
  );
}

export default App;


{/*
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