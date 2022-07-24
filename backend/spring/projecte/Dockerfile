FROM maven:alpine as build

COPY pom.xml .

RUN mvn clean package -Dmaven.test.skip -Dmaven.main.skip

COPY src ./src

RUN mvn clean package -Dmaven.test.skip

# RUN mkdir -p target/docker-packaging && cd target/docker-packaging && jar -xf ../my-app*.jar


FROM openjdk:11-jdk-alpine 
ARG --from=build JAR_FILE=target/*.jar
COPY --from=build ${JAR_FILE} app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]