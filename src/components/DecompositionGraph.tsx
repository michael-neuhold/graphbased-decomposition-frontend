import { Pane } from "evergreen-ui";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DecompositionControllerImplApi, DecompositionCouplingParametersDto, GraphVisualizationDto } from "../api";
import { API_BASE_URL, API_CONFIG } from "../config";
import { Graph } from "./Graph";

import ForceGraph2D, { GraphData } from 'react-force-graph-2d';

export const DecompositionGraph = () => {

  const location = useLocation();
  const repositoryId = location.state?.id;
  const decompositionParameters: DecompositionCouplingParametersDto = {
    semanticCoupling: location.state?.semanticCoupling,
    logicalCoupling: location.state?.semanticCoupling,
    contributorCoupling: location.state?.semanticCoupling,
    dependencyCoupling: location.state?.semanticCoupling,
    numberOfServices: 3,
    classClusterThreshold: 3,
    intervalSeconds: 3600
  }
  console.log(decompositionParameters)
  const [data, setData] = useState<GraphData>();

  useEffect(() => {
    const callDecomposition = async () => {
      const api = new DecompositionControllerImplApi(API_CONFIG, API_BASE_URL);
      const response = await api.decomposeRepositoryByIdAsGraphVisualizationUsingPOST(repositoryId, decompositionParameters);
      console.log(response.data)
      setData(response.data as GraphData);
    }
    callDecomposition().catch(console.error);

  }, [])

  return (
    <Pane>
      {
        data == undefined ? <h1>loading</h1> :
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