#!/bin/bash

API_VER=1.1.0

# check if api folder exist
if [ ! -d api ]
then
    mkdir api/ && \
    curl https://github.com/bpodwinski/oc_07_groupomania_api/releases/download/v${API_VER}/release.zip -L -o api.zip && \
    unzip api.zip -d ./ && \
    cp -r dist/* api/ && \
    rm -rf api.zip dist/
fi

# start API server
cd api/
npm install
