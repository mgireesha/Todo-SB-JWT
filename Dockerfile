# Use the official Node.js image as the base image
FROM eclipse-temurin:17-jdk-alpine

# Set the working directory in the container
#WORKDIR /app

# Copy the application files into the working directory
COPY target/*.jar app.jar

# Install the application dependencies
#RUN npm install

# Build the React application
#RUN npm run build

# Expose port 3000
EXPOSE 8087

# Define the entry point for the container
ENTRYPOINT ["java","-jar","/app.jar"]
#ENTRYPOINT ["/app/build/index.html"]


