import { Button, Combobox, Heading, Pane, TextInput, Switch, Label, Tooltip, InfoSignIcon, Tablist, Tab, Paragraph } from "evergreen-ui"
import { useState } from "react";
import { Graph } from "./Graph";

export const Decomposition = () => {

  const [semanticCoupling, setSemanticCoupling] = useState(false)
  const [logicalCoupling, setLogicalCoupling] = useState(false)
  const [contributorCoupling, setContributorCoupling] = useState(false)
  const [dependencyCoupling, detDependencyCoupling] = useState(false)


  const [selectedIndex, setSelectedIndex] = useState(0)
  const [tabs] = useState(
    [
      {
        name: 'Settings'
      },
      {
        name: 'Result',
      }
    ])

  return (
    <Pane>
      <Heading size={500} paddingBottom={20}>
        Decomposition
      </Heading>

      <Pane height={120}>
        <Tablist marginBottom={16} flexBasis={240} marginRight={24}>
          {tabs.map((tab, index) => (
            <Tab
              key={tab.name}
              id={tab.name}
              onSelect={() => setSelectedIndex(index)}
              isSelected={index === selectedIndex}
              aria-controls={`panel-${tab}`}
            >
              {tab.name}
            </Tab>
          ))}
        </Tablist>
        <Pane flex="1">
          {
            selectedIndex == 0 ?
              (
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
                </Pane>)
              :
              (
                <Graph></Graph>
              )
          }
        </Pane>
      </Pane>
    </Pane>
  )
}