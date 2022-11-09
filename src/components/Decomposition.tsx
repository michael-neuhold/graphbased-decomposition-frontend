import { Pane, Spinner } from "evergreen-ui";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DecompositionControllerImplApi } from "../api";
import { API_BASE_URL, API_CONFIG } from "../config";

import ForceGraph2D from 'react-force-graph-2d';

export const Decomposition = () => {

  let { decompositionId } = useParams();
  
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(undefined);

  const callDecomposition = async () => {
    const api = new DecompositionControllerImplApi(API_CONFIG, API_BASE_URL);
    const response = await api.getDecompositionByIdAsVisualizationUsingGET(Number(decompositionId));
    setData(response.data);
    setLoading(false);
  }
  
  useEffect(() => {
    callDecomposition().catch(console.error);
  }, [])

  return (
    <Pane margin="auto"> {
      loading ? 
          (<Spinner></Spinner>) : (<></>)}
          <ForceGraph2D
            backgroundColor="white"
            linkColor={_ => "gray"}
            linkWidth={1}
            linkLabel="value"
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
    </Pane>
  )

}