import re
import os
import json
import argparse  # Import argparse module for command-line argument parsing

# Function to parse samtools stats files and extract QC metrics
def parse_samtools_stats(file_path):
    with open(file_path, 'r') as f:
        stats_data = f.read()
    
    total_bases = int(re.search(r'SN\ttotal length:\s+(\d+)', stats_data).group(1))
    raw_reads = int(re.search(r'SN\traw total sequences:\s+(\d+)', stats_data).group(1))
    reads_mapped = int(re.search(r'SN\treads mapped:\s+(\d+)', stats_data).group(1))
    reads_unmapped = int(re.search(r'SN\treads unmapped:\s+(\d+)', stats_data).group(1))
    trimmed_reads = int(re.search(r'SN\tbases trimmed:\s+(\d+)', stats_data).group(1))

    return {
        "total_bases": total_bases,
        "raw_reads": raw_reads,
        "trimmed_reads": trimmed_reads,  
        "filtered_reads": 0,  # Placeholder, update if available
        "reads_mapped_to_host": reads_mapped,
        "unclassified_reads": reads_unmapped,  # Assuming unmapped reads are unclassified
    }

# Function to parse Kraken taxonomy result file
def parse_kraken_result(file_path):
    taxonomy = []

    print(f"Opening Kraken file: {file_path}")
    
    with open(file_path, 'r') as f:
        lines = f.readlines()

    if not lines:
        print(f"Warning: Kraken result file {file_path} is empty.")
    
    # Loop through the lines in the Kraken file and extract taxonomy information
    for line in lines:
        if line.startswith("#") or not line.strip():
            continue  # Skip headers or empty lines

        parts = line.split('\t')
        
        if len(parts) < 6:  # Ensure there are enough columns (not sure about this is it is another format)
            print(f"Skipping line due to insufficient columns: {line}")
            continue  # Skip malformed lines

        try:
            percentage = float(parts[0].strip())  # Percentage
            tot_all = int(parts[1].strip())  # Total reads classified at the current level
            tot_lvl = int(parts[2].strip())  # Total reads at the current taxonomic level
            lvl_type = parts[3].strip()  # Taxonomic rank (U for unclassified)
            num_reads = int(parts[4].strip())  # Number of reads at this rank
            name = parts[5].strip()  # Taxonomy name 

            # Append data
            taxonomy.append({
                "percentage": percentage,
                "tot_all": tot_all,
                "tot_lvl": tot_lvl,
                "lvl_type": lvl_type,
                "num_reads": num_reads,
                "name": name
            })
        except ValueError as e:
            print(f"Error parsing line: {line}. Error: {e}")
    
    if not taxonomy:
        print(f"Warning: No taxonomy data parsed from {file_path}")
    
    return taxonomy


# Combine QC and Kraken data maybe add other stuff as well later
def generate_json(samtools_dir, kraken_dir, metadata):
    qc_table = []
    visualizations = {
        "krona_plots": [],
        "classifier_results_table": []
    }
    sample_summary = []

    # Get all samtools and kraken files
    samtools_files = [os.path.join(samtools_dir, f) for f in os.listdir(samtools_dir) if f.endswith('.stats')]
    kraken_files = [os.path.join(kraken_dir, f) for f in os.listdir(kraken_dir) if f.endswith('.txt')]

    # Process each sample's samtools stats
    for samtools_file in samtools_files:
        sample_id = "_".join(os.path.basename(samtools_file).split('_')[:2])  # Get first part of filename, assume it is sample ID 
        
        # Find the corresponding kraken file for the sample (one file per sample)
        matching_kraken_files = [kf for kf in kraken_files if sample_id in os.path.basename(kf)]
        if len(matching_kraken_files) != 1:
            print(f"Warning: Expected 1 Kraken file for sample {sample_id}, but found {len(matching_kraken_files)}.")
            continue  # Skip if we don't have exactly 1 Kraken file
        
        # Debugging: Check which Kraken file is being matched
        print(f"Matched Kraken file: {matching_kraken_files} for sample {sample_id}")
        
        # Parse Kraken taxonomy report (one file per sample)
        taxonomy_data = parse_kraken_result(matching_kraken_files[0])
        
        # Append taxonomy and QC data
        qc_metrics = parse_samtools_stats(samtools_file)
        visualizations["classifier_results_table"].append({
            "sample_id": sample_id,
            "sample_file": matching_kraken_files[0],
            "taxonomy": taxonomy_data  # Add taxonomy information under each sample (not sure about this format either)
        })
        qc_table.append({
            "sample_id": sample_id,
            **qc_metrics
        })
        sample_summary.append({
            "sample_id": sample_id,
            "pass_fail_status": "PASS" if qc_metrics["reads_mapped_to_host"] > 0 else "FAIL",
            "reads_assigned_to_viruses": sum(
                item["tot_all"] for item in taxonomy_data if "Virus" in item["name"]
            )
        })

    # Create JSON structure
    result = {
        "qc_metrics": qc_table,
        "classification_visualization": visualizations,
        "metadata": {
            "sample_info": metadata,
            "pipeline_description": "The Taxprofiler pipeline uses various taxonomic classifiers to assign reads to taxonomic groups and generate summary statistics.",
            "ticket_summary": sample_summary
        }
    }
    return result

# Write JSON to file
def save_json(data, output_file):
    with open(output_file, 'w') as f:
        json.dump(data, f, indent=4)

# Main function with argparse for samtools_dir and kraken_dir
def main():
    # Set up argument parser
    parser = argparse.ArgumentParser(description="Generate a JSON report from Samtools and Kraken results.")
    parser.add_argument('--samtools_dir', required=True, help="Directory containing Samtools stats files.")
    parser.add_argument('--kraken_dir', required=True, help="Directory containing Kraken result files.")
    parser.add_argument('--output', default='metavis_report.json', help="Output file for the JSON report.")

    # Parse arguments
    args = parser.parse_args()

    # Sample metadata (you can replace this with real data or get from another source)
    metadata = {
        "sample_source": "Blood",
        "batch": "Batch 1",
        "ticket_number": "TICKET1234",
        "priority": "High",
        "accreditation": "ISO 9001",
        "library_preparation": "Illumina TruSeq",
        "ct_values": "30",
        "wet_lab_methods": "PCR amplification",
        "taxprofiler_version": "v2.1.0",
        "software_versions": {
            "kraken": "2.0",
            "samtools": "1.9",
            "ktImportText": "2.6.0"
        }
    }

    # Generate the final report
    result = generate_json(args.samtools_dir, args.kraken_dir, metadata)
    
    # Output the result to a JSON file
    save_json(result, args.output)
    print(f"Final report saved to {args.output}")

if __name__ == "__main__":
    main()
