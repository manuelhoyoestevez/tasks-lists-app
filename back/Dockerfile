FROM node:16.14.0-stretch

LABEL maintainer="Manuel Hoyo Estévez <manuelhoyoestevez@gmail.com>"

# Prepare app directory
RUN mkdir -p /usr/src/app
ADD . /usr/src/app
WORKDIR /usr/src/app

# Clean distributions
RUN rm -rf /usr/src/app/dist

# Clean dependencies
RUN rm -rf /usr/src/app/node_modules

# Install
RUN npm install

# Build
RUN npm run build

# Run
CMD bash -c "npm install && npm run start:prod"
