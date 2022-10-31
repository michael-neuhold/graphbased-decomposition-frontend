import './App.css';
import ForceGraph2D from 'react-force-graph-2d';
import ForceGraph3D from 'react-force-graph-3d';
import { useEffect, useState } from 'react';

function App() {

  let [data, setData] = useState(undefined)

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "logicalCoupling": false,
      "semanticCoupling": true,
      "contributorCoupling": false,
      "numServices": 2,
      "intervalSeconds": 3600,
      "sizeThreshold": 15
    })
  };

  useEffect(() => {
    fetch("http://localhost:8080/decompositions/decompose/1689/visualization", requestOptions)
      .then(response => response.json())
      .then(data => setData(data))
  }, [])

  return (
    <div className="App" >
      {
        data == undefined ? <h1>data loading...</h1> :
          <ForceGraph3D
            backgroundColor="black"
            linkColor={_ => "white"}
            linkWidth={3}
            nodeColor={_ => "lightgreen"}
            nodeRelSize={8}
            nodeLabel="group"
            graphData={data} />
      }
    </div>
  );
}

export default App;
