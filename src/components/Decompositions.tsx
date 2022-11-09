import { BanCircleIcon, Button, Heading, Pane, Table, TickCircleIcon } from "evergreen-ui"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { DecompositionControllerImplApi, DecompositionDto } from "../api"
import { API_BASE_URL, API_CONFIG } from "../config";


export const Decompositions = () => {

  const [decompositions, setDecompositions] = useState<DecompositionDto[]>([])

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
            <Table.Row key={decomposition?.decompositionId}>
              <Table.TextCell>{decomposition?.decompositionId}</Table.TextCell>
              <Table.TextCell>{decomposition?.gitRepository?.name}</Table.TextCell>
              <Table.TextCell>{decomposition?.parameters?.semanticCoupling ? <TickCircleIcon color="success" marginRight={16} /> : <BanCircleIcon color="danger" marginRight={16} />}</Table.TextCell>
              <Table.TextCell>{decomposition?.parameters?.logicalCoupling ? <TickCircleIcon color="success" marginRight={16} /> : <BanCircleIcon color="danger" marginRight={16} />}</Table.TextCell>
              <Table.TextCell>{decomposition?.parameters?.contributorCoupling ? <TickCircleIcon color="success" marginRight={16} /> : <BanCircleIcon color="danger" marginRight={16} />}</Table.TextCell>
              <Table.TextCell>{decomposition?.parameters?.dependencyCoupling ? <TickCircleIcon color="success" marginRight={16} /> : <BanCircleIcon color="danger" marginRight={16} />}</Table.TextCell>
              <Table.Cell>
                <Link to={'/visualization/' + decomposition?.decompositionId}><Button marginRight={24}>Graph</Button></Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Pane>
  )
}