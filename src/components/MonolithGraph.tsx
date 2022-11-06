import { Pane, Spinner } from 'evergreen-ui';
import { useLocation } from "react-router-dom";
import ForceGraph2D, { GraphData } from 'react-force-graph-2d';
import { DecompositionControllerImplApi, MonolithCouplingParametersDto } from '../api';
import { useEffect, useState } from 'react';
import { API_BASE_URL, API_CONFIG } from '../config';

export const MonolithGraph = () => {

  const location = useLocation();
  const repositoryId = location.state?.id;
  
  const monolithCouplingParametersDto: MonolithCouplingParametersDto = {
    semanticCoupling: true,
    logicalCoupling: true,
    contributorCoupling: true,
    dependencyCoupling: true,
    intervalSeconds: 3600
  }

  const [data, setData] = useState<GraphData>();
  
  useEffect(() => {
    const callDecomposition = async () => {
      const api = new DecompositionControllerImplApi(API_CONFIG, API_BASE_URL);
      const response = await api.monolithicCouplingVisualizationUsingPOST(repositoryId, monolithCouplingParametersDto);
      setData(response.data as GraphData);
    }
    callDecomposition().catch(console.error);

  }, [])

  return (
    <Pane>
      {
        data == undefined ? <Spinner></Spinner> :
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
    </Pane>
  )

}