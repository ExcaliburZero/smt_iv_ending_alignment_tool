from typing import Any, Dict, List

import argparse
import csv
import json
import sys


def main(argv: List[str]):
    parser = argparse.ArgumentParser()

    parser.add_argument("input_csv")
    parser.add_argument("output_json")

    args = parser.parse_args(argv)

    with open(args.input_csv, "r") as input_stream:
        reader = csv.DictReader(input_stream)

        data = [convert_row(row) for row in reader]

    with open(args.output_json, "w") as output_stream:
        json.dump(data, output_stream)

    print(f"Converted {args.input_csv} to json: {args.output_json}")


def convert_row(row: Dict[str, Any]) -> Dict[str, Any]:
    prompt = row["Prompt"]

    choices = [
        {"text": row["Choice 1"], "effect": row["Choice 1 effect"]},
        {"text": row["Choice 2"], "effect": row["Choice 2 effect"]},
        {"text": row["Choice 3"], "effect": row["Choice 3 effect"]},
    ]

    choices = [choice for choice in choices if choice["text"] != ""]

    return {
        "prompt": prompt,
        "choices": choices,
    }


if __name__ == "__main__":
    main(sys.argv[1:])
