#!/bin/bash

export NODE_ENV=development
npm install
cd api
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
npm run build
mkdir -p static

cd ../ui && npm run build
cp -r dist/* ../api/static
export NODE_ENV=production
