#!/bin/bash


npm install
cd api && npm run build
mkdir static
rm ./prisma/dev.db
npx prisma generate
npx prisma migrate deploy
npx prisma db seed

cd ../ui && npm run build
cp -r dist/* ../api/static
