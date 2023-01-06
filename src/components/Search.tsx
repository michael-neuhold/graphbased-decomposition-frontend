import { Heading, Pane, Table, TextInput, Button, Checkbox } from "evergreen-ui"
import { useEffect, useState } from "react"
import { Configuration, DecompositionControllerImplApi, Component } from "../api"

const config = new Configuration();

export const Search = () => {

  const [decompositionId, setDecompositionId] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [javaSuffix, setJavaSuffix] = useState(false)

  const [components, setComponents] = useState<Component[]>([])

  const fetchData = async () => {
    const api = new DecompositionControllerImplApi(config, "http://localhost:8081");
    const response = await api.searchFileInDecompositionUsingGET(decompositionId, javaSuffix, searchTerm)
    setComponents(response.data);
  }

  useEffect(() => {
    
  }, [])

  return (
    <>
    <Pane display="flex">
      <Pane paddingBottom={10}>
        Decomposition Id:
        <TextInput name="decomposition-id" placeholder="123456" value={decompositionId} onChange={(e: any) => setDecompositionId(e.target.value)} marginLeft={10} />
      </Pane>
      <Pane paddingBottom={10} marginLeft={10}>
        Search Term:
        <TextInput name="search-term" placeholder="Task.java" value={searchTerm} onChange={(e: any) => setSearchTerm(e.target.value)} marginLeft={10}/>
      </Pane>
      <Pane paddingBottom={10} marginLeft={10}>
        <Checkbox
        margin={7}
        label="Set `.java` suffix?"
        checked={javaSuffix}
        onChange={e => setJavaSuffix(e.target.checked)}
      />
      </Pane>
      <Button appearance="primary" onClick={fetchData} marginLeft={10}>
        Search
      </Button>
      </Pane>
      <Pane marginTop={40}>
        {components.map( component =>
          <Pane paddingBottom={30} >
            <Heading size={500} paddingBottom={10}>
              {component.id}
            </Heading>
            <Table>
              <Table.Head>
                <Table.TextHeaderCell>Node Id</Table.TextHeaderCell>
              </Table.Head>
              <Table.Body>
                {component?.nodes?.map(node =>
                  <Table.Row key={node.id}>
                    <Table.TextCell>{node.id}</Table.TextCell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </Pane>
        )}
      </Pane>
    </>
  )
}