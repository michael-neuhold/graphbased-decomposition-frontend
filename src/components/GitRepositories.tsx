import { Button, Checkbox, Dialog, Heading, Link, Pane, Table, TextInput, TextInputField } from "evergreen-ui"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Configuration, GitRepository, RepositoryControllerImplApi } from "../api"


const config = new Configuration();

export const GitRepositories = () => {


  const [semanticCoupling, setSemanticCoupling] = useState(true)
  const [logicalCoupling, setLogicalCoupling] = useState(false)
  const [contributorCoupling, setContributorCoupling] = useState(false)
  const [dependencyCoupling, setDependencyCoupling] = useState(false)

  const [numberOfServices, setNumberOfServices] = useState(3)
  const [threshold, setThreshold] = useState(20)

  const [selectedRepository, setSelectedRepository] = useState<GitRepository>()

  const [repositories, setRepositories] = useState<GitRepository[]>([])
  const [newRepository, setNewRepository] = useState("")
  const [addedRepository, setAddedRepository] = useState(0)

  const [isShown, setIsShown] = useState(false)
  const [isShownMonolithDialog, setIsShownMonolithDialog] = useState(false)


  const addNewRepository = () => {
    const addRepository = async () => {
      const api = new RepositoryControllerImplApi(config, "http://localhost:8080");
      const response = await api.addRepositoryUsingPOST({ uri: newRepository })
      console.log(response)
      setAddedRepository(addedRepository + 1);
    }
    addRepository().catch(console.error);
    setNewRepository("");
  }

  const navigate = useNavigate();
  const navigateToDecomposition = () => {
    navigate('/decomposition/graph',
      {
        state: {
          id: selectedRepository?.id,
          semanticCoupling: semanticCoupling,
          contributorCoupling: contributorCoupling,
          logicalCoupling: logicalCoupling,
          dependencyCoupling: dependencyCoupling,
          numberOfServices: numberOfServices,
          threshold: threshold
        }
      }
    );
  }

  const navigateToMonolith = () => {
    navigate('/monolith/graph',
      {
        state: {
          id: selectedRepository?.id,
          semanticCoupling: semanticCoupling,
          contributorCoupling: contributorCoupling,
          logicalCoupling: logicalCoupling,
          dependencyCoupling: dependencyCoupling
        }
      }
    );
  }

  const fetchData = async () => {
    const api = new RepositoryControllerImplApi(config, "http://localhost:8080");
    const repos = await api.getAllRepositoriesUsingGET();
    setRepositories(repos.data);
  }

  useEffect(() => {
    fetchData().catch(console.error);
  }, [addedRepository])

  return (
    <Pane>
      <Heading size={900} paddingBottom={20}>
        Git Repositories
      </Heading>

      <Pane paddingBottom={10}>
        <TextInput name="repository-url-input" placeholder="https://github.com/denver-code/nftgenerator" value={newRepository} onChange={(e: any) => setNewRepository(e.target.value)} />
        <Button appearance="primary" marginLeft={24} onClick={addNewRepository}>
          Add
        </Button>
      </Pane>

      <Table>
        <Table.Head>
          <Table.TextHeaderCell>Id</Table.TextHeaderCell>
          <Table.TextHeaderCell>Name</Table.TextHeaderCell>
          <Table.TextHeaderCell>Url</Table.TextHeaderCell>
          <Table.TextHeaderCell>Action</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body>
          {repositories.map((repository) => (
            <Table.Row key={repository.id} isSelectable onSelect={() => setSelectedRepository(repository)}>
              <Table.TextCell>{repository.id}</Table.TextCell>
              <Table.TextCell>{repository.name}</Table.TextCell>
              <Table.TextCell><Link href={repository.remotePath} target="blank">{repository.remotePath}</Link></Table.TextCell>
              <Table.Cell>
                <Button onClick={() => setIsShownMonolithDialog(true)} marginRight={24}>Monolith</Button>
                <Button onClick={() => setIsShown(true)}>Microservice suggestions</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Pane>
        <Dialog
          isShown={isShown}
          title="Decomposition parameters"
          intent="primary"
          onConfirm={() => {
            setIsShown(false);
            navigateToDecomposition();
          }}
          onCancel={() => setIsShown(false)}
          confirmLabel="Decompose"
        >
          <Checkbox
            margin={4}
            label="Semantic Coupling"
            checked={semanticCoupling}
            onChange={e => setSemanticCoupling(e.target.checked)}
          />
          <Checkbox
            margin={4}
            label="Logical Coupling"
            checked={logicalCoupling}
            onChange={e => setLogicalCoupling(e.target.checked)}
          />
          <Checkbox
            margin={4}
            label="Contributor Coupling"
            checked={contributorCoupling}
            onChange={e => setContributorCoupling(e.target.checked)}
          />
          <Checkbox
            margin={4}
            marginBottom={24}
            label="Dependency Coupling"
            checked={dependencyCoupling}
            onChange={e => setDependencyCoupling(e.target.checked)}
          />
          <TextInputField required label="Number of Services" name="numberOfServices" placeholder="3" value={numberOfServices} onChange={(e: any) => setNumberOfServices(e.target.value)} ></TextInputField>
          <TextInputField required label="Threshold" name="threshold" placeholder="20" value={threshold} onChange={(e: any) => setThreshold(e.target.value)} ></TextInputField>
        </Dialog>
        <Dialog
          isShown={isShownMonolithDialog}
          title="Monolith parameters"
          intent="primary"
          onConfirm={() => {
            setIsShown(false);
            navigateToMonolith();
          }}
          onCancel={() => setIsShownMonolithDialog(false)}
          confirmLabel="Monolith"
        >
          <Checkbox
            margin={4}
            label="Semantic Coupling"
            checked={semanticCoupling}
            onChange={e => setSemanticCoupling(e.target.checked)}
          />
          <Checkbox
            margin={4}
            label="Logical Coupling"
            checked={logicalCoupling}
            onChange={e => setLogicalCoupling(e.target.checked)}
          />
          <Checkbox
            margin={4}
            label="Contributor Coupling"
            checked={contributorCoupling}
            onChange={e => setContributorCoupling(e.target.checked)}
          />
          <Checkbox
            margin={4}
            marginBottom={24}
            label="Dependency Coupling"
            checked={dependencyCoupling}
            onChange={e => setDependencyCoupling(e.target.checked)}
          />
        </Dialog>
      </Pane>
    </Pane>
  )
}