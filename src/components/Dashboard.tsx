import { Pane, Paragraph, SidebarTab, Tablist } from "evergreen-ui"
import React from "react"
import { Decomposition } from "./Decomposition"
import { Evaluation } from "./Evaluation"
import { GitRepositories } from "./GitRepositories"

const tabsList = [
  {
    name: "Git Repositories",
    tab: <GitRepositories></GitRepositories>
  },
  {
    name: "Decomposition",
    tab: <Decomposition></Decomposition>
  },
  {
    name: "Evaluation",
    tab: <Evaluation></Evaluation>
  }
]

export const Dashboard = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [tabs] = React.useState(tabsList)

  return (
    <Pane display="flex" padding={10}>
      <Tablist marginBottom={16} flexBasis={240} marginRight={24}>
        {tabs.map((tab, index) => (
          <SidebarTab
            key={tab.name}
            id={tab.name}
            onSelect={() => setSelectedIndex(index)}
            isSelected={index === selectedIndex}
            aria-controls={`panel-${tab.name}`}
          >
            {tab.name}
          </SidebarTab>
        ))}
      </Tablist>
      <Pane padding={16} background="gray50" flex="1">
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
