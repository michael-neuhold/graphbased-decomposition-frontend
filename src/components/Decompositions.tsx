import { BanCircleIcon, Button, Checkbox, Heading, Pane, Table, TickCircleIcon } from "evergreen-ui"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { DecompositionControllerImplApi, DecompositionDto } from "../api"
import { API_BASE_URL, API_CONFIG } from "../config";


export const Decompositions = () => {

  const [decompositions, setDecompositions] = useState<DecompositionDto[]>([])
  const [guessClassTask, setGuessClassTask] = useState(false)

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
      <Heading size={900} paddingBottom={20}>
        Decompositions
      </Heading>
      <Checkbox
        margin={4}
        label="Guess class task"
        marginBottom={24}
        checked={guessClassTask}
        onChange={e => setGuessClassTask(e.target.checked)}
      />
      <Table>
        <Table.Head>
          <Table.TextHeaderCell>Id</Table.TextHeaderCell>
          <Table.TextHeaderCell>Name</Table.TextHeaderCell>
          <Table.TextHeaderCell>Semantic Coupling</Table.TextHeaderCell>
          <Table.TextHeaderCell>Logical Coupling</Table.TextHeaderCell>
          <Table.TextHeaderCell>Contributor Coupling</Table.TextHeaderCell>
          <Table.TextHeaderCell>Dependency Coupling</Table.TextHeaderCell>
          <Table.TextHeaderCell>Number of Service Target</Table.TextHeaderCell>
          <Table.TextHeaderCell>Service Size Threshold</Table.TextHeaderCell>
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
              <Table.TextCell>{decomposition?.parameters?.numServices}</Table.TextCell>
              <Table.TextCell>{decomposition?.parameters?.sizeThreshold}</Table.TextCell>
              <Table.Cell>
                <Link to={'/visualization/' + decomposition?.decompositionId} state={{ guessClassTask: guessClassTask }}><Button marginRight={24}>Graph</Button></Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Pane>
  )
}