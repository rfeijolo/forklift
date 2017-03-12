FROM node:4.3.2
MAINTAINER rfeijolo@gmail.com
COPY package.json /opt/forklift/package.json
WORKDIR /opt/forklift
RUN npm install --silent
COPY . /opt/forklift
