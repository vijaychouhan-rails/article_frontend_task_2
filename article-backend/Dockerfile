FROM node:14 as builder
WORKDIR /usr/app
COPY . .
RUN npm install
RUN npm run migrate
ENTRYPOINT ["npm", "start", "bin/www"]



