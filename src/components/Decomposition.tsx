import { Button, Combobox, Heading, Pane, TextInput, Switch, Label, Tooltip, InfoSignIcon } from "evergreen-ui"
import { useState } from "react";
import { Graph } from "./Graph";

export const Decomposition = () => {

  const [semanticCoupling, setSemanticCoupling] = useState(false)
  const [logicalCoupling, setLogicalCoupling] = useState(false)
  const [contributorCoupling, setContributorCoupling] = useState(false)
  const [dependencyCoupling, detDependencyCoupling] = useState(false)
  
  return (
    <Pane>
      <Heading size={500} padding={20}>
        Decomposition
      </Heading>

      <Pane paddingBottom={10}>

        <Combobox
          items={['Repository 1', 'Repository 2', 'Repository 3', 'Repository 4']}
          onChange={selected => console.log(selected)}
          placeholder="Repository"
        />

        <Pane>
          <Pane display="flex" flexDirection="row" paddingTop={10}>
            <Switch padding={2} checked={semanticCoupling} onChange={(e) => setSemanticCoupling(e.target.checked)} />
            <Label marginLeft={10}>Semantic Coupling</Label>
          </Pane>
          <Pane display="flex" flexDirection="row" paddingTop={10}>
            <Switch padding={2} checked={logicalCoupling} onChange={(e) => setLogicalCoupling(e.target.checked)} />
            <Label marginLeft={10}>Logical Coupling</Label>
          </Pane>
          <Pane display="flex" flexDirection="row" paddingTop={10}>
            <Switch padding={2} checked={contributorCoupling} onChange={(e) => setContributorCoupling(e.target.checked)} />
            <Label marginLeft={10}>Contributor Coupling</Label>
          </Pane>
          <Pane display="flex" flexDirection="row" paddingTop={10}>
            <Switch padding={2} checked={dependencyCoupling} onChange={(e) => detDependencyCoupling(e.target.checked)} />
            <Label marginLeft={10}>Dependency Coupling</Label>
          </Pane>
        </Pane>

        <Button marginTop={16} appearance="primary">
          Decompose
        </Button>

        
      </Pane>
      <Graph></Graph>
    </Pane>
  )
}