#!/bin/bash

npm install
cd api
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
npm run build
mkdir static

cd ../ui && npm run build
cp -r dist/* ../api/static
