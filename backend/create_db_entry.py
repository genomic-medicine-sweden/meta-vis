
from datetime import date

def get_patient() -> dict:
    return {
        "patient" : {}
    }

def get_sample() -> dict:
    return {
        "sample" : {
            "sample_id": "",
            "sample_source": "",
            "biopsy_id": ""
        }
    }

def get_library_preparation() -> dict:
    return {
        "library_preparation" : {
            "library_name": "",
            "batch_id": "",
            "sample_type": ""
        }
    }

def get_sequencing() -> dict:
    return {
        "sequencing" : {
            "platform": "",
            "flowcell_id": "",
            "date": date(2024, 1, 1),
            "barcode_index": "",
            "num_reads": int()
        }
    }

def get_taxprofiler_metadata() -> dict:
    taxprofiler = {
        "taxprofiler" : {
            "num_otus" : int()
        }
    }
    return taxprofiler

def get_metadata() -> dict:
    patient = get_patient()
    sample = get_sample()
    library_preparation = get_library_preparation()
    sequencing = get_sequencing()
    taxprofiler = get_taxprofiler_metadata()
    return patient | sample | library_preparation | sequencing | taxprofiler

def get_taxprofiler_data(taxprofilers : dict[str, dict]) -> dict:
    out_dict = {}
    for taxprofile_name, taxprofile in taxprofilers.items():
        out_dict[taxprofile_name] = taxprofile
    return out_dict

def get_data(taxprofilers : dict[str, dict]) -> dict:
    taxprofiler = get_taxprofiler_data(taxprofilers)
    return taxprofiler

def build_entry(taxprofilers : dict[str, dict]) -> dict[str, dict]:
    """
    Create a MongoDB entry containing data and metadata from different taxprofilers, among others

    :param taxprofilers: The taxprofilers as a dictionary, where the keys are 
    the name of the taxprofiler and the inner dictionary contains the metadata
    :type taxprofilers: dict[str, dict]
    :return: An entry suitable for MongoDB
    :rtype: dict[str, dict]
    """
    combined = {"metadata" : get_metadata()} | {"data" : get_data(taxprofilers)}
    return combined