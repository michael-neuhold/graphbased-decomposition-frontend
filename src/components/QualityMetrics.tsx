import { Heading, Pane, Table } from "evergreen-ui"
import { useEffect, useState } from "react";
import { EvaluationControllerImplApi, QualityMetricDto } from "../api";
import { API_BASE_URL, API_CONFIG } from "../config";

export const QualityMetrics = () => {

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
      <Heading size={900} paddingBottom={20}>
        Quality Metrics
      </Heading>
      <Pane>
        {qualityMetrics?.map(qualityMetricOfRepository => (
          <Pane paddingBottom={30} >
            <Heading size={500} paddingBottom={10}>
              {qualityMetricOfRepository[0].repositoryName + " (" + qualityMetricOfRepository[0].repositoryId + ")"}
            </Heading>
            <Table>
              <Table.Head>
                <Table.TextHeaderCell>Decomposition Id</Table.TextHeaderCell>
                <Table.TextHeaderCell>Number Of Services</Table.TextHeaderCell>
                <Table.TextHeaderCell>avg. Class Count</Table.TextHeaderCell>
                <Table.TextHeaderCell>avg. LOC</Table.TextHeaderCell>
                <Table.TextHeaderCell>contributor Overlapping</Table.TextHeaderCell>
                <Table.TextHeaderCell>contributors per Microservice</Table.TextHeaderCell>
              </Table.Head>
              <Table.Body>
                {qualityMetricOfRepository.map(qualityMetric =>
                  <Table.Row key={qualityMetric.repositoryId}>
                    <Table.TextCell>{qualityMetric.decompositionId}</Table.TextCell>
                    <Table.TextCell>{qualityMetric.numberOfServices}</Table.TextCell>
                    <Table.TextCell>{qualityMetric.averageClassCount?.toFixed(2)}</Table.TextCell>
                    <Table.TextCell>{qualityMetric.averageLoc?.toFixed(2)}</Table.TextCell>
                    <Table.TextCell>{qualityMetric.contributorOverlapping?.toFixed(2)}</Table.TextCell>
                    <Table.TextCell>{qualityMetric.contributorsPerMicroservice?.toFixed(2)}</Table.TextCell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </Pane>
        ))}
      </Pane>
    </Pane>
  )
}