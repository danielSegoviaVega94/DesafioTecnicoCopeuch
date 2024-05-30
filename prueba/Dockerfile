# Etapa 1: Construcción del JAR
FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app

# Copiar el archivo de configuración de Maven y los archivos fuente
COPY pom.xml .
COPY src ./src

# Compilar el proyecto y empaquetar el JAR
RUN mvn clean package -DskipTests

# Etapa 2: Imagen final
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copiar el JAR desde la etapa de construcción
COPY --from=build /app/target/prueba-0.0.1-SNAPSHOT.jar /app/prueba.jar

# Comando para ejecutar la aplicación
CMD ["java", "-jar", "/app/prueba.jar"]


