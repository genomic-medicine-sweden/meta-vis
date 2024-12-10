import Plot from "react-plotly.js";

interface KronaPlotData {
  labels: string[];
  parents: string[];
  values: number[];
}

export const KronaPlot = ({ data }: { data: KronaPlotData }) => {
  
   
  return (
    <Plot
      data={[
        {
          type: "sunburst",
          labels: data.labels,
          parents: data.parents,
          values: data.values,
          branchvalues: "total",
        },
      ]}
      layout={{ title: "Krona Visualization", width: 0.9 * window.innerWidth, height: 0.9 * window.innerHeight }}
    />
  );
};
