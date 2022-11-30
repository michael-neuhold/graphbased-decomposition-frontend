import { Heading, Link, Pane } from "evergreen-ui"
import { SWAGGER_DOC } from "../config"

export const Header = () => {
  return (
    <Pane padding={24}>
      <Heading size={600}>
        Graphbased decomposition
      </Heading>
      <Link href={SWAGGER_DOC} target="blank">Swagger UI</Link>
    </Pane>
  )
}