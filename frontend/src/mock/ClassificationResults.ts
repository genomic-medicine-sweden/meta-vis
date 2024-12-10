// Data for Krona-like Plot (Sunburst)
export const kronaData = {
    labels: [
      "Life", 
      "Bacteria", 
      "Viruses", 
      "Eukaryotes",
      "Proteobacteria", 
      "Firmicutes",
      "Bacteriophage",
      "HIV", 
      "Fungi", 
      "Plants"
    ],
    parents: [
      "", 
      "Life", 
      "Life", 
      "Life", 
      "Bacteria", 
      "Bacteria", 
      "Viruses", 
      "Viruses", 
      "Eukaryotes", 
      "Eukaryotes"
    ],
    values: [10000, 5000, 2000, 3000, 2000, 3000, 1000, 1000, 2000, 1000]
  };
  
  // Data for Reads Per Hit Chart
  export const readsChartData = [
    {
      name: "Classifier 1",
      hits: ["E. coli", "S. aureus", "Bacteriophage T4"],
      reads: [500, 300, 200],
    },
    {
      name: "Classifier 2",
      hits: ["HIV", "Candida albicans", "Arabidopsis thaliana"],
      reads: [400, 250, 150],
    },
  ];
  
  // Data for Taxpasta Table
  export const tableData = [
    {
      key: 1,
      classifier: "Classifier 1",
      taxon: "E. coli",
      reads: 500,
    },
    {
      key: 2,
      classifier: "Classifier 1",
      taxon: "S. aureus",
      reads: 300,
    },
    {
      key: 3,
      classifier: "Classifier 1",
      taxon: "Bacteriophage T4",
      reads: 200,
    },
    {
      key: 4,
      classifier: "Classifier 2",
      taxon: "HIV",
      reads: 400,
    },
    {
      key: 5,
      classifier: "Classifier 2",
      taxon: "Candida albicans",
      reads: 250,
    },
    {
      key: 6,
      classifier: "Classifier 2",
      taxon: "Arabidopsis thaliana",
      reads: 150,
    },
  ];
  