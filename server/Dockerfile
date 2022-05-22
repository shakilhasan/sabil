FROM node:lts
WORKDIR /usr/src/app
COPY package*.json ./
ENV NODE_ENV=production
RUN npm ci
COPY . .
EXPOSE 8002
CMD [ "npm", "start" ]