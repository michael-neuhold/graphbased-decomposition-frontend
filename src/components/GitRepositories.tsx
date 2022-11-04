import { Button, Heading, Pane, Table, TextInput } from "evergreen-ui"

export const GitRepositories = () => {

  const repositories = [
    {
      id: 1,
      name: "Repo1",
      url: "http://github.com/aaaaa"
    },
    {
      id: 2,
      name: "Repo1",
      url: "http://github.com/aaaaa"
    },
    {
      id: 3,
      name: "Repo1",
      url: "http://github.com/aaaaa"
    },
    {
      id: 4,
      name: "Repo1",
      url: "http://github.com/aaaaa"
    },
    {
      id: 5,
      name: "Repo1",
      url: "http://github.com/aaaaa"
    }

  ]

  return (
    <Pane>
      <Heading size={500} padding={20}>
        Git Repository
      </Heading>

      <Pane paddingBottom={10}>
        <TextInput name="repository-url-input" placeholder="https://github.com/denver-code/nftgenerator" />
        <Button marginLeft={16} appearance="primary">
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
              <Table.TextCell>{repository.url}</Table.TextCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Pane>
  )
}