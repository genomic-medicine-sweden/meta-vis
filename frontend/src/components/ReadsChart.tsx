import Plot from "react-plotly.js";

interface Classifier {
  hits: number[];
  reads: number[];
  name: string;
}

interface ReadsChartProps {
  data: Classifier[];
}

export const ReadsChart: React.FC<ReadsChartProps> = ({ data }) => {

  const traces: Partial<Plotly.Data>[] = data.map(classifier => ({
    x: classifier.hits,
    y: classifier.reads,
    type: "bar",
    name: classifier.name,
  }));

  return (
    <Plot
      data={traces}
      layout={{
        title: "Reads per Hit",
        barmode: "group",
        xaxis: { title: "Hits" },
        yaxis: { title: "Number of Reads" },
        width: 0.9 * window.innerWidth,
      }}
    />
  );
};
