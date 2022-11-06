import { useLocation, useParams } from 'react-router-dom'

export const MonolithGraph = (props: any) => {

  const location = useLocation();
  console.log(props, " props");
  console.log(location, " useLocation Hook");
  const data = location.state?.id;
  console.log(data)
  return (
    <h1>MonolithGraph</h1>
  )

}