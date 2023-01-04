FROM --platform=linux/amd64 node:16-alpine

WORKDIR /src/app
COPY package.json /app
RUN npm install
COPY . /app

ENV HOST 0.0.0.0
EXPOSE 3000
CMD ["npm","run","dev"]