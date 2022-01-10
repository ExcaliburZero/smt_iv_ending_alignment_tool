rm -Rdf build
mkdir build

# Handle data files
python csv_to_json.py data/choices.csv data/choices.json
python json_to_js.py data/choices.json typescript/choices.ts

# Compile typescript files
tsc

# Copy over static files
cp static/** build/

# Copy over Javascript files
cp typescript/*.js* build/

echo "Finished building static site: build/"