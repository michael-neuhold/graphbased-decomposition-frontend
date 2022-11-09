import { randomBytes, randomInt } from "crypto";
import { Heading, Pane, Table } from "evergreen-ui"
import { useEffect, useState } from "react";
import { EvaluationControllerImplApi, QualityMetricDto } from "../api";
import { API_BASE_URL, API_CONFIG } from "../config";

export const Evaluation = () => {

  const [qualityMetrics, setQualityMetrics] = useState<QualityMetricDto[][]>();

  const fetchData = async () => {
    const api = new EvaluationControllerImplApi(API_CONFIG, API_BASE_URL);
    const metrics = await api.exportQualityMetricsUsingGET();
    setQualityMetrics(metrics.data);
  }
  
  useEffect(() => {
    fetchData().catch(console.error);
  }, [])

  return (
    <Pane>
      <Heading size={500} paddingBottom={20}>
        Evaluation
      </Heading>
      <Pane>
      {qualityMetrics?.map(qualityMetricOfRepository => (
      <>
      <Heading size={500} paddingBottom={10} paddingTop={30}>
        {qualityMetricOfRepository[0].repositoryName + " (" + qualityMetricOfRepository[0].repositoryId + ")"}
      </Heading>
      <Table>
        <Table.Head>
          <Table.TextHeaderCell>Id</Table.TextHeaderCell>
          <Table.TextHeaderCell>Name</Table.TextHeaderCell>
          <Table.TextHeaderCell>averageClassCount</Table.TextHeaderCell>
          <Table.TextHeaderCell>averageLoc</Table.TextHeaderCell>
          <Table.TextHeaderCell>contributorOverlapping</Table.TextHeaderCell>
          <Table.TextHeaderCell>contributorsPerMicroservice</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body>
          {qualityMetricOfRepository.map(qualityMetric => 
            <Table.Row key={qualityMetric.repositoryId}>
              <Table.TextCell>{qualityMetric.repositoryId}</Table.TextCell>
              <Table.TextCell>{qualityMetric.repositoryName}</Table.TextCell>
              <Table.TextCell>{qualityMetric.averageClassCount}</Table.TextCell>
              <Table.TextCell>{qualityMetric.averageLoc}</Table.TextCell>
              <Table.TextCell>{qualityMetric.contributorOverlapping}</Table.TextCell>
              <Table.TextCell>{qualityMetric.contributorsPerMicroservice}</Table.TextCell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      </>
      )) }
      </Pane>
    </Pane>
  )
}