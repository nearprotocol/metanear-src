#!/bin/bash
set +ex

npm run build
npm run export
rm -rf ../docs/*
cp -R default_files/* ../docs
cp -R out/* ../docs/
