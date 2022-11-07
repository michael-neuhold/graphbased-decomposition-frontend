import { Pane, Tab, Tablist } from "evergreen-ui"
import React from "react"
import { Decompositions } from "./Decompositions"
import { Evaluation } from "./Evaluation"
import { GitRepositories } from "./GitRepositories"

const tabsList = [
  {
    name: "Git Repositories",
    tab: <GitRepositories></GitRepositories>
  },
  {
    name: "Evaluation",
    tab: <Evaluation></Evaluation>
  },
  {
    name: "Decompositions",
    tab: <Decompositions></Decompositions>
  }
]

export const Dashboard = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [tabs] = React.useState(tabsList)

  return (
    <Pane display="flex" padding={10}>
      <Tablist marginBottom={16} flexBasis={240} marginRight={24}>
        {tabs.map((tab, index) => (
          <Tab
            direction="vertical"
            key={tab.name}
            id={tab.name}
            onSelect={() => setSelectedIndex(index)}
            isSelected={index === selectedIndex}
            aria-controls={`panel-${tab.name}`}
          >
            {tab.name}
          </Tab>
        ))}
      </Tablist>
      <Pane padding={16} flex="1">
        {tabs.map((tab, index) => (
          <Pane
            key={tab.name}
            id={`panel-${tab.name}`}
            role="tabpanel"
            aria-labelledby={tab.name}
            aria-hidden={index !== selectedIndex}
            display={index === selectedIndex ? 'block' : 'none'}
          >
            {tab.tab}
          </Pane>
        ))}
      </Pane>
    </Pane>
  )
}
