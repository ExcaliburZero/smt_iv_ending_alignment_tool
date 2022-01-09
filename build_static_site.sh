rm -Rdf build
mkdir build
cp static/** build/
cp typescript/*.js* build/
cp data/* build/
echo "Finished building static site: build/"