
from csv import reader as csv_reader
from pandas import (
    DataFrame, 
    concat
)

def parse_kraken_2_report(path : str) -> DataFrame:
    """
    Parse a Kraken 2 TSV report into a Pandas DataFrame

    :param path: File path to Kraken 2 report
    :type path: str
    :return: The Kraken2 report as a DataFrame
    :rtype: DataFrame
    """
    with open(path) as file:
        reader = csv_reader(file, delimiter="\t", quotechar="\"")
        df = DataFrame()
        for row in reader:
            row[0] = row[0].strip()
            row_dict = {
                "Percentage of fragments covered by the clade rooted at this taxon" : [row[0]],
                "Number of fragments covered by the clade rooted at this taxon" : [row[1]],
                "Number of fragments assigned directly to this taxon" : [row[2]],
                "Rank code" : [row[3]],
                "NCBI taxonomic ID number" : [row[4]],
                "Indented scientific name" : [row[5]]
            }
            row_df = DataFrame.from_dict(row_dict)
            df = concat([df, row_df])

    return df.reset_index().drop("index", axis=1)