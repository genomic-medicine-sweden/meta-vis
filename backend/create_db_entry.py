
from datetime import datetime

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
            "date": datetime(2024, 1, 1),
            "barcode_index": "",
            "num_reads": int()
        }
    }

def get_taxprofiler(taxprofilers : dict[str, dict]) -> dict:
    out_dict = {
        "taxprofiler" : {}
    }
    for taxprofile_name, taxprofile in taxprofilers.items():
        out_dict["taxprofiler"][taxprofile_name] = taxprofile
    return out_dict


def build_entry(taxprofilers : dict[str, dict]):
    patient = get_patient()
    sample = get_sample()
    library_preparation = get_library_preparation()
    sequencing = get_sequencing()
    taxprofiler = get_taxprofiler(taxprofilers)
    
    combined = patient | sample | library_preparation | sequencing | taxprofiler
    return combined