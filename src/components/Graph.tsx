import { useEffect, useState } from "react";

import ForceGraph2D from 'react-force-graph-2d';
import ForceGraph3D from 'react-force-graph-3d';

const Graph = () => {

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
    <div className="App" >
      {
        data == undefined ? <h1>data loading...</h1> :
          <ForceGraph2D
            backgroundColor="white"
            linkColor={_ => "gray"}
            linkWidth={0.5}
            nodeLabel="label"
            nodeRelSize={8}
            nodeCanvasObject={(node: any, ctx: any, globalScale: any) => {
              const label = node.label;
              const fontSize = 12/globalScale;
              ctx.font = `${fontSize}px Sans-Serif`;
              const textWidth = ctx.measureText(label).width;
              const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding
  
              ctx.fillStyle = 'rgba(255, 255, 255, 0.0)';
              ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
  
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillStyle = node.color;
              ctx.fillText(label, node.x, node.y - 10);
              ctx.beginPath(); ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false); ctx.fill();
              node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
            }}
            nodeAutoColorBy="group"
            linkDirectionalParticleWidth={3}
            linkDirectionalParticles="value"
            linkDirectionalParticleSpeed={(d: any) => d.value * 0.02}
            graphData={data} />
      }
    </div>
  )

}