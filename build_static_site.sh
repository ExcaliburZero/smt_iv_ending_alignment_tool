rm -Rdf build
mkdir build
cp static/** build/
cp typescript/*.js build/
echo "Finished building static site: build/"