import Plot from "react-plotly.js";

interface KronaPlotData {
  labels: string[];
  parents: string[];
  values: number[];
}

const KronaPlot = ({ data }: { data: KronaPlotData }) => {
  
   
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
      layout={{ title: "Krona Visualization", width: 0.8 * window.innerWidth, height: 800 }}
    />
  );
};

export default KronaPlot;
