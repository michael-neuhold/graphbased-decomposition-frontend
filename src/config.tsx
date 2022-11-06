import { Configuration } from "./api";

export const API_BASE_URL = "http://localhost:8080";
export const API_CONFIG = new Configuration();

/*

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

  const config = new Configuration();
  
  useEffect(() => {

    const callDecomposition = async () => {
      const api = new DecompositionControllerImplApi(config, "http://localhost:8080");
      api.decomposeRepositoryByIdAsGraphVisualizationUsingPOST(repositoryId, decompositionParameters);
    }

    callDecomposition().catch(console.error);

    //fetch("http://localhost:8080/decompositions/decompose/1689/visualization", requestOptions)
    fetch("http://localhost:8080/decompositions/monolith/49511/coupling/visualization", requestOptions)
      .then(response => response.json())
      .then(data => setData(data))
  }, [])

*/