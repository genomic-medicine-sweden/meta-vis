import { Card, Flex } from "antd";
import { KronaPlot } from "../components/KronaPlot"
import { ReadsChart } from "../components/ReadsChart";
import { kronaData, readsChartData } from "../mock/ClassificationResults";

export const ClassificationResults = () => {

  return (
    <Card>
    <Flex vertical align="center">
    <KronaPlot data={kronaData} />
    <ReadsChart data={readsChartData} />
    </Flex>
    </Card>
  )
}
