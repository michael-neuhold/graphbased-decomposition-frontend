import { Heading, Link, Pane } from "evergreen-ui"

export const Header = () => {
  return (
    <Pane padding={24}>
      <Heading size={600}>
        Graphbased decomposition
      </Heading>
      <Link href="http://localhost:8080/swagger-ui.html" target="blank">Swagger UI</Link>
    </Pane>
  )
}