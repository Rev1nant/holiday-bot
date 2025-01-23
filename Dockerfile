FROM  arm64v8/node:19-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN ["npm", "install"]
COPY . ./
CMD ["npm", "start"]docker push rev1nant/holiday-bot:tagname
