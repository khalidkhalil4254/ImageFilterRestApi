# ImageFilterRestApi

ImageFilterRestApi is simple API is used to take the Image URL and return a Processed and Filtered Image to the user:


The project is split into two parts:
1. Backend RESTful API - Typescript - > Node-Express application
2. Image-Processing Framework - > Jimp

## Getting Started
> _tip_: it's recommended that you start with getting the backend API running since the frontend web application depends on the API.

### Prerequisite
1. The depends on the Node Package Manager (NPM). You will need to download and install Node from [https://nodejs.com/en/download](https://nodejs.org/en/download/). This will allow you to be able to run `npm` commands.
2. Environment variables will need to be set. These environment variables include database connection details that should not be hard-coded into the application code.

Afterwards, we can prevent any credential files from being included in your solution by adding the file to our `.gitignore` file.

### 3. Backend API
Launch the backend API locally. The API is the application's interface to the Image filter-processor Jimp.

* To download all the package dependencies, run the command from the project root directory:
    ```bash
    npm i
    ```
* To run the application locally, run:
    ```bash
    npm run dev
    ```
* You can visit `http://localhost:8080/filteredimage?Imaage_Url=${your_image_Url}` in your web browser to verify that the application is running. You should see an Image as the expected response.
