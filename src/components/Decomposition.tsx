import { Button, Combobox, Heading, Pane, TextInput, Switch, Label, Tooltip, InfoSignIcon, Tablist, Tab, Paragraph, Checkbox, Select, SelectMenu, Option } from "evergreen-ui"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Configuration, GitRepository, RepositoryControllerImplApi } from "../api";
import { API_BASE_URL, API_CONFIG } from "../config";
import { Graph } from "./Graph";

export const Decomposition = () => {

  const [semanticCoupling, setSemanticCoupling] = useState(false)
  const [logicalCoupling, setLogicalCoupling] = useState(false)
  const [contributorCoupling, setContributorCoupling] = useState(false)
  const [dependencyCoupling, setDependencyCoupling] = useState(false)


  const [repositories, setRepositories] = useState<GitRepository[]>([])
  const [selectedRepository, setSelectedRepository] = useState<GitRepository>()

  const [data, setData] = useState(false);
  const navigate = useNavigate();
  const navigateTo = () => {
    navigate('/decomposition/graph', { state: { id: 7, color: 'green' } });
  }

  useEffect(() => {
    const fetchData = async () => {
      const api = new RepositoryControllerImplApi(API_CONFIG, API_BASE_URL);
      const repos = await api.getAllRepositoriesUsingGET();
      setRepositories(repos.data);
    }
    fetchData().catch(console.error);
  }, [])

  return (
    <Pane>
      <Pane paddingBottom={10} display="flex" flexDirection="column">
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
          margin={0}
          label="Contributor Coupling"
          checked={contributorCoupling}
          onChange={e => setContributorCoupling(e.target.checked)}
        />
        <Checkbox
          margin={0}
          label="Dependency Coupling"
          checked={dependencyCoupling}
          onChange={e => setDependencyCoupling(e.target.checked)}
        />
        <Button onClick={navigateTo}>Decompose</Button>
      </Pane>
    </Pane>
  )
}