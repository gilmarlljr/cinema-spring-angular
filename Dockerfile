# base image
FROM node:12.16.1
FROM adoptopenjdk/openjdk11:ubi

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY cinema-angular-client/package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@9.0.0

# add app
COPY cinema-angular-client /app

# start app
CMD ng serve --host 0.0.0.0
EXPOSE 4200
EXPOSE 5000
ADD /cinema-spring-api-0.0.1-SNAPSHOT.jar api.jar
ENTRYPOINT ["java","-jar","api.jar"]
