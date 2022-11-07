import { Button, Heading, Pane, Table } from "evergreen-ui"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Configuration, DecompositionControllerImplApi, DecompositionDto } from "../api"
import { API_BASE_URL, API_CONFIG } from "../config";


export const Decompositions = () => {

  const [selectedDecomposition, setSelectedDecomposition] = useState<DecompositionDto>()

  const [decompositions, setDecompositions] = useState<DecompositionDto[]>([])

  const navigate = useNavigate();
  const navigateToDecomposition = () => {
    navigate('/decomposition/graph',
      {
        state: {
          id: selectedDecomposition?.decompositionId
        }
      }
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      const api = new DecompositionControllerImplApi(API_CONFIG, API_BASE_URL);
      const repos = await api.getAllDecompositionsUsingGET();
      setDecompositions(repos.data);
    }
    fetchData().catch(console.error);
  }, [])

  return (
    <Pane>
      <Heading size={500} paddingBottom={20}>
        Decompositions
      </Heading>

      <Table>
        <Table.Head>
          <Table.TextHeaderCell>Id</Table.TextHeaderCell>
          <Table.TextHeaderCell>Name</Table.TextHeaderCell>
          <Table.TextHeaderCell>Semantic Coupling</Table.TextHeaderCell>
          <Table.TextHeaderCell>Logical Coupling</Table.TextHeaderCell>
          <Table.TextHeaderCell>Contributor Coupling</Table.TextHeaderCell>
          <Table.TextHeaderCell>Dependency Coupling</Table.TextHeaderCell>
          <Table.TextHeaderCell>Action</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body>
          {decompositions.map((decomposition) => (
            <Table.Row key={decomposition?.decompositionId} isSelectable onSelect={() => setSelectedDecomposition(decomposition)}>
              <Table.TextCell>{decomposition?.decompositionId}</Table.TextCell>
              <Table.TextCell>{decomposition?.gitRepository?.name}</Table.TextCell>
              <Table.TextCell>{decomposition?.parameters?.semanticCoupling ? "True" : "False"}</Table.TextCell>
              <Table.TextCell>{decomposition?.parameters?.logicalCoupling ? "True" : "False"}</Table.TextCell>
              <Table.TextCell>{decomposition?.parameters?.contributorCoupling ? "True" : "False"}</Table.TextCell>
              <Table.TextCell>{decomposition?.parameters?.dependencyCoupling ? "True" : "False"}</Table.TextCell>
              <Table.Cell>
                <Button onClick={() => navigateToDecomposition()} marginRight={24}>Graph</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Pane>
  )
}