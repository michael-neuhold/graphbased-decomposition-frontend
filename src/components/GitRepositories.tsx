import { Button, Heading, Pane, Table, TextInput } from "evergreen-ui"
import { ChangeEvent, useEffect, useState } from "react"
import { Configuration, GitRepository, RepositoryControllerImplApi, RepositoryControllerImplApiFactory } from "../api"


const config = new Configuration();

export const GitRepositories = () => {

  const [repositories, setRepositories] = useState<GitRepository[]>([])
  const [newRepository, setNewRepository] = useState("")
  const [addedRepository, setAddedRepository] = useState(0)


  const addNewRepository = () => {
    const addRepository = async () => {
      const api = new RepositoryControllerImplApi(config, "http://localhost:8080");
      const response = api.addRepositoryUsingPOST({uri: newRepository})
    }
    addRepository().catch(console.error);
    setAddedRepository(addedRepository + 1);
    setNewRepository("");
  }

  useEffect(() => {
    const fetchData = async () => {
      const api = new RepositoryControllerImplApi(config, "http://localhost:8080");
      const repos = await api.getAllRepositoriesUsingGET();
      setRepositories(repos.data);
    }
    fetchData().catch(console.error);
  }, [addedRepository])

  return (
    <Pane>
      <Heading size={500} paddingBottom={20}>
        Git Repository
      </Heading>

      <Pane paddingBottom={10}>
        <TextInput name="repository-url-input" placeholder="https://github.com/denver-code/nftgenerator" value={newRepository} onChange={(e: any) => setNewRepository(e.target.value)} />
        <Button marginLeft={16} appearance="primary" onClick={addNewRepository}>
          Add
        </Button>
      </Pane>

      <Table>
        <Table.Head>
          <Table.TextHeaderCell>Id</Table.TextHeaderCell>
          <Table.TextHeaderCell>Name</Table.TextHeaderCell>
          <Table.TextHeaderCell>Url</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body>
          {repositories.map((repository) => (
            <Table.Row key={repository.id}>
              <Table.TextCell>{repository.id}</Table.TextCell>
              <Table.TextCell>{repository.name}</Table.TextCell>
              <Table.TextCell>{repository.remotePath}</Table.TextCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Pane>
  )
}