# README get json from taxprofiler results

### Run script:   
```
python taxprofiler_parser.py --samtools_dir [DIR/SAMTOOLS_STATS] --kraken_dir [DIR/KRAKEN_RESULTS] --output [OUTPUTNAME]

example:
python taxprofiler_parser.py --samtools_dir samtools_results/ --kraken_dir kraken_results/ --output output_file.json
``` 

### Input structure of samtools and Kraken directories (example)

```
014_KV24-9180-RNA--241105_730-1597_241106_RNA.stats
015_KV24-10663-RNA-241105_730-1597_241106_RNA.stats
016_P3HR1-RNA-241105_730-1597_241106.fastq_RNA.stats
030_KV24-9180-DNA-241105_729-1595_241106_DNA.stats
031_KV24-10663-DNA-241105_729-1595_241106_DNA.stats
032_P3HR1-DNA-241105_729-1595_241106_DNA.stats
```

```
014_KV24-9180-RNA--241105_730-1597_241106_se_RNA_Kraken2_PlusPF_120124.kraken2.kraken2.report.txt
015_KV24-10663-RNA-241105_730-1597_241106_se_RNA_Kraken2_PlusPF_120124.kraken2.kraken2.report.txt
016_P3HR1-RNA-241105_730-1597_241106.fastq_se_RNA_Kraken2_PlusPF_120124.kraken2.kraken2.report.txt
030_KV24-9180-DNA-241105_729-1595_241106_se_DNA_Kraken2_PlusPF_120124.kraken2.kraken2.report.txt
032_P3HR1-DNA-241105_729-1595_241106_se_DNA_Kraken2_PlusPF_120124.kraken2.kraken2.report.txt
```

### Output json example  

```
{
    "qc_metrics": [
        {
            "sample_id": "030_KV24-9180-DNA-241105",
            "total_bases": 5622008959,
            "raw_reads": 2665037,
            "trimmed_reads": 0,
            "filtered_reads": 0,
            "reads_mapped_to_host": 26500966,
            "unclassified_reads": 1133652
        },
        {
            "sample_id": "032_P3HR1-DNA-241105",
            "total_bases": 1030552174,
            "raw_reads": 5826612,
            "trimmed_reads": 0,
            "filtered_reads": 0,
            "reads_mapped_to_host": 5764449,
            "unclassified_reads": 204447
        },
.....
    "classification_visualization": {
        "krona_plots": [],
        "classifier_results_table": [
            {
                "sample_id": "030_KV24-9180-DNA-241105",
                "sample_file": "kraken_results/030_KV24-9180-DNA-241105_729-1595_241106_se_DNA_Kraken2_PlusPF_120124.kraken2
.kraken2.report.txt",
                "taxonomy": [
                    {
                        "percentage": 66.32,
                        "tot_all": 794309,
                        "tot_lvl": 794309,
                        "lvl_type": "U",
                        "num_reads": 0,
                        "name": "unclassified"
                    },
                    {
                        "percentage": 34.67,
                        "tot_all": 382240,
                        "tot_lvl": 7,
                        "lvl_type": "R",
                        "num_reads": 1,
                        "name": "root"
                    },
                    {
....
```
