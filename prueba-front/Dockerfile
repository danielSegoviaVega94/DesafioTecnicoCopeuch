# Establecer la imagen base para construir el proyecto
FROM node:18-alpine AS build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el package.json y el package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente al contenedor
COPY . .

# Construir el proyecto
RUN npm run build

# Establecer la imagen base para servir la aplicación
FROM nginx:alpine

# Copiar el build de React desde el contenedor de construcción al directorio de NGINX
COPY --from=build /app/build /usr/share/nginx/html

# Exponer el puerto en el que NGINX correrá
EXPOSE 80

# Comando para ejecutar NGINX
CMD ["nginx", "-g", "daemon off;"]
