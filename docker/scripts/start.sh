#!/bin/sh
npm install
npx prisma migrate deploy
npx prisma generate
npx prisma db seed service
npm run start:local
