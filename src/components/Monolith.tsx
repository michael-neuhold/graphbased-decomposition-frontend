import { Combobox, Heading, Pane } from "evergreen-ui"
import { useState } from "react"
import { Graph } from "./Graph"

export const Monolith = () => {

  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <Pane>
      <Heading size={500} paddingBottom={20}>
        Monolith
      </Heading>

      <Combobox
        items={['Repository 1', 'Repository 2', 'Repository 3', 'Repository 4']}
        onChange={selected => console.log(selected)}
        placeholder="Repository"
        marginBottom={20}
      />

      <Graph></Graph>

    </Pane>
  )
}