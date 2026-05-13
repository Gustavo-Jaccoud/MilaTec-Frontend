FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./
# google-maps-react declara peer antigo de React; o projeto usa React 18
RUN npm ci --legacy-peer-deps

COPY . .

EXPOSE 5173

ENV VITE_PROXY_API_TARGET=http://api:3000

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
