FROM node:8-alpine
WORKDIR /covid-19-rest/
# create local user
COPY . .

RUN chown -R node:node /covid-19-rest

USER node
RUN npm install

EXPOSE 3333
