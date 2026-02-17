# building stage, compiles React + TypeScript into static files
FROM node:20-slim AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY tsconfig.json ./
COPY index.html ./
COPY vite.config.ts ./
COPY postcss.config.cjs ./
COPY tailwind.config.js ./
COPY src/ ./src/
COPY public/ ./public/

RUN npm run build

# final container, nginx serving static pages
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]