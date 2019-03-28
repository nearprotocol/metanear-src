#!/bin/bash
set +ex

npm run build
npm run export
rm -rf ../docs/_next
mv out/* ../docs/
