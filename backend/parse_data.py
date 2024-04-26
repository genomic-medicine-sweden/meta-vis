
import csv
from pandas import (
    DataFrame, 
    concat
)

def parse_kraken_output(path : str) -> DataFrame:
    with open(path) as file:
        reader = csv.reader(file, delimiter="\t", quotechar='"')
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