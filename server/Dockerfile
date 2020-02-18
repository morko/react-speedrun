# base image
FROM node:12.16.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# copy and install
COPY . .
RUN npm install

# start app
CMD ["npm", "run", "dev"]