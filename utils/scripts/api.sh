#!/bin/bash
set -ex

rm -fr api/ && \
mkdir api/ && \
curl https://github.com/bpodwinski/oc_07_groupomania_api/releases/download/v$1/release.zip -L -o api.zip && \
unzip api.zip -d ./ && \
cp -r dist/* api/ && \
rm -rf api.zip dist/

# install npm modules
cd api/
npm install

sleep 1
echo "API $API_VER successfully installed!"
