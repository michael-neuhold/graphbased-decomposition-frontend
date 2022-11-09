import { Heading, Pane, Table } from "evergreen-ui"
import { useEffect, useState } from "react";
import { EvaluationControllerImplApi, PerformanceMetricsDto, QualityMetricDto } from "../api";
import { API_BASE_URL, API_CONFIG } from "../config";

export const PerformanceMetrics = () => {

  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetricsDto>();

  const fetchData = async () => {
    const api = new EvaluationControllerImplApi(API_CONFIG, API_BASE_URL);
    const metrics = await api.exportPerformanceMetricsUsingGET();
    setPerformanceMetrics(metrics.data);
  }

  useEffect(() => {
    fetchData().catch(console.error);
  }, [])

  return (
    <Pane>
      <Heading size={900} paddingBottom={20}>
        Performance Metrics
      </Heading>
      <Pane>
        <Pane paddingBottom={30} >
          <Heading size={500} paddingBottom={10}>
            Logical Coupling Performance Metrics
          </Heading>
          <Table>
            <Table.Head>
              <Table.TextHeaderCell>Repository Name</Table.TextHeaderCell>
              <Table.TextHeaderCell>Commit Count</Table.TextHeaderCell>
              <Table.TextHeaderCell>History Length</Table.TextHeaderCell>
              <Table.TextHeaderCell>Execution Time</Table.TextHeaderCell>
            </Table.Head>
            <Table.Body>
              {performanceMetrics?.logicalCouplingPerformanceMetric?.map(performanceMetricForRepository =>
                <Table.Row key={performanceMetricForRepository.repositoryName}>
                  <Table.TextCell>{performanceMetricForRepository.repositoryName}</Table.TextCell>
                  <Table.TextCell>{performanceMetricForRepository.commitCount}</Table.TextCell>
                  <Table.TextCell>{performanceMetricForRepository.historyLength}</Table.TextCell>
                  <Table.TextCell>{performanceMetricForRepository.executionTime}</Table.TextCell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </Pane>

        <Pane paddingBottom={30} >
          <Heading size={500} paddingBottom={10}>
            Semantic Coupling Performance Metrics
          </Heading>
          <Table>
            <Table.Head>
              <Table.TextHeaderCell>Repository Name</Table.TextHeaderCell>
              <Table.TextHeaderCell>Commit Count</Table.TextHeaderCell>
              <Table.TextHeaderCell>History Length</Table.TextHeaderCell>
              <Table.TextHeaderCell>Execution Time</Table.TextHeaderCell>
            </Table.Head>
            <Table.Body>
              {performanceMetrics?.semanticCouplingPerformanceMetric?.map(performanceMetricForRepository =>
                <Table.Row key={performanceMetricForRepository.repositoryName}>
                  <Table.TextCell>{performanceMetricForRepository.repositoryName}</Table.TextCell>
                  <Table.TextCell>{performanceMetricForRepository.commitCount}</Table.TextCell>
                  <Table.TextCell>{performanceMetricForRepository.historyLength}</Table.TextCell>
                  <Table.TextCell>{performanceMetricForRepository.executionTime}</Table.TextCell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </Pane>

        <Pane paddingBottom={30} >
          <Heading size={500} paddingBottom={10}>
            Contributor Coupling Performance Metrics
          </Heading>
          <Table>
            <Table.Head>
              <Table.TextHeaderCell>Repository Name</Table.TextHeaderCell>
              <Table.TextHeaderCell>Commit Count</Table.TextHeaderCell>
              <Table.TextHeaderCell>History Length</Table.TextHeaderCell>
              <Table.TextHeaderCell>Execution Time</Table.TextHeaderCell>
            </Table.Head>
            <Table.Body>
              {performanceMetrics?.contributorCouplingPerformanceMetric?.map(performanceMetricForRepository =>
                <Table.Row key={performanceMetricForRepository.repositoryName}>
                  <Table.TextCell>{performanceMetricForRepository.repositoryName}</Table.TextCell>
                  <Table.TextCell>{performanceMetricForRepository.commitCount}</Table.TextCell>
                  <Table.TextCell>{performanceMetricForRepository.historyLength}</Table.TextCell>
                  <Table.TextCell>{performanceMetricForRepository.executionTime}</Table.TextCell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </Pane>

        <Pane paddingBottom={30} >
          <Heading size={500} paddingBottom={10}>
            Dependency Coupling Performance Metrics
          </Heading>
          <Table>
            <Table.Head>
              <Table.TextHeaderCell>Repository Name</Table.TextHeaderCell>
              <Table.TextHeaderCell>Commit Count</Table.TextHeaderCell>
              <Table.TextHeaderCell>History Length</Table.TextHeaderCell>
              <Table.TextHeaderCell>Execution Time</Table.TextHeaderCell>
            </Table.Head>
            <Table.Body>
              {performanceMetrics?.dependencyCouplingPerformanceMetric?.map(performanceMetricForRepository =>
                <Table.Row key={performanceMetricForRepository.repositoryName}>
                  <Table.TextCell>{performanceMetricForRepository.repositoryName}</Table.TextCell>
                  <Table.TextCell>{performanceMetricForRepository.commitCount}</Table.TextCell>
                  <Table.TextCell>{performanceMetricForRepository.historyLength}</Table.TextCell>
                  <Table.TextCell>{performanceMetricForRepository.executionTime}</Table.TextCell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </Pane>
      </Pane>
    </Pane>
  )
}