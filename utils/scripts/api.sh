#!/bin/bash

API_VER=1.3.0

rm -fr api/ && \
mkdir api/ && \
curl https://github.com/bpodwinski/oc_07_groupomania_api/releases/download/v${API_VER}/release.zip -L -o api.zip && \
unzip api.zip -d ./ && \
cp -r dist/* api/ && \
rm -rf api.zip dist/

# start API server
cd api/
npm install

sleep 1
echo API $API_VER successfully installed!
