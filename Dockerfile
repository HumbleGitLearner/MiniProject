# Build Angular
# https://hub.docker.com/_/node
FROM node:22 AS ngbuild

# Create a workdir named as frontend in stage ngbuild
WORKDIR /frontend

# Install Angular globally
RUN npm i -g @angular/cli@17.3.8

# docker file is outside /client
COPY frontend/angular.json .
COPY frontend/package*.json .
COPY frontend/tsconfig*.json .
COPY frontend/proxy.config.json .
COPY frontend/ngsw-config.json .
COPY frontend/src src


# Install Modules
# ci will use lock ver. but not the newest ver.
# by put && it only build if npm ci is successful
RUN npm ci
RUN ng build

# Build Spring Boot
# https://hub.docker.com/_/openjdk
FROM openjdk:21 AS javabuild

# Create a workdir named as backend in stage javabuild
WORKDIR /backend
#VOLUME /tmp


COPY backend/mvnw .
COPY backend/pom.xml .
COPY backend/.mvn .mvn
COPY backend/src src

# Copy ng build angular file from stage=ngbuild at <frontend> workdir to static in /giphy SB
# reminder to delete the static file copied from angular before build
#COPY --from=ngbuild /client/dist/frontend/browser/ src/main/resources/static
COPY --from=ngbuild /frontend/dist/client/ src/main/resources/static
#COPY --from=ngbuild /frontend/dist/ src/main/resources/static

# Generate target/server-0.0.1-SNAPSHOT.jar
RUN chmod a+x mvnw
RUN ./mvnw package -Dmaven.test.skip=true

# Run container
FROM openjdk:21

WORKDIR /app

# Copy the service account key file
COPY config/neat-shell-428904-j4-3a5b8c0f9a48.json /app/neat-shell-428904-j4-3a5b8c0f9a48.json

# remember to change the project name
COPY --from=javabuild /backend/target/backend-0.0.1-SNAPSHOT.jar app.jar

# Set the GOOGLE_APPLICATION_CREDENTIALS environment variable
#ENV GOOGLE_APPLICATION_CREDENTIALS="/app/neat-shell-428904-j4-3a5b8c0f9a48.json"


ENV PORT=8080

EXPOSE ${PORT}
ENTRYPOINT SERVER_PORT=${PORT} java -jar app.jar

# build docker file
# >> docker build -t leqing92/day36-giphy:v1
# docker build -t dockeryh902/miniproject:v1.5 .

# run docker
# >> docker run -d -p 8080:8080 -e GIPHY_KEY=tmYYz3vSBNVJN5EkzU5snDyB54qTXSVe dockeryh902/miniproject:v1.3
