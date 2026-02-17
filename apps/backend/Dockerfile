# building stage, with typescript dependencies
FROM node:20-slim AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY tsconfig.json ./
COPY src/ ./src/
COPY utils/ ./utils/

RUN npm run build

# building final container with compiled js code, without typescript dependencies
FROM node:20-slim

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY drizzle/ ./drizzle/

RUN mkdir -p data

EXPOSE 3000

CMD ["node", "dist/src/server.js"]