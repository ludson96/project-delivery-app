FROM node:20-alpine
RUN apk add --no-cache openssl
WORKDIR /backend
COPY package* ./
RUN npm install
COPY . ./
RUN npx prisma generate
EXPOSE 3001
CMD ["sh", "-c", "npx ts-node prisma/setup-db.ts && npm run dev"]