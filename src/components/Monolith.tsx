import { Button, Combobox, Heading, Pane } from "evergreen-ui"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Configuration, GitRepository, RepositoryControllerImplApi } from "../api"
import { API_BASE_URL, API_CONFIG } from "../config"

export const Monolith = () => {

  const [repositories, setRepositories] = useState<GitRepository[]>([])
  const [selectedRepository, setSelectedRepository] = useState<GitRepository>()

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
      <Heading size={500} paddingBottom={20}>
        Monolith
      </Heading>

      <Combobox
        items={repositories}
        itemToString={repository => repository ? repository.name : ''}
        onChange={selected => setSelectedRepository(selected)}
        placeholder="Repository"
        marginBottom={20}
      />

    </Pane>
  )
}