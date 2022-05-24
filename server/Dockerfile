FROM node:lts
WORKDIR /usr/src/app
COPY package*.json ./
ENV NODE_ENV=production
RUN npm ci
COPY . .
EXPOSE 8008
CMD [ "npm", "start" ]