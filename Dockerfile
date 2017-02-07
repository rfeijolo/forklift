FROM node:7.5
MAINTAINER rfeijolo@gmail.com
COPY package.json /opt/forklift/package.json
WORKDIR /opt/forklift
RUN npm install --silent
COPY . /opt/forklift
