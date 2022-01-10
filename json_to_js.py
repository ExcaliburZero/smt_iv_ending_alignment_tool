from typing import Any, Dict, List

import argparse
import csv
import json
import os
import sys


def main(argv: List[str]):
    parser = argparse.ArgumentParser()

    parser.add_argument("input_json")
    parser.add_argument("output_js")

    args = parser.parse_args(argv)

    data_name = os.path.splitext(os.path.basename(args.output_js))[0]

    with open(args.input_json, "r") as input_stream:
        data = json.load(input_stream)

    with open(args.output_js, "w") as output_stream:
        data_js = json.dumps(data)
        output_stream.write(f"const {data_name} = {data_js};\n")

    print(f"Converted {args.input_json} to js: {args.output_js}")


if __name__ == "__main__":
    main(sys.argv[1:])
