# Noroff: Front End Assignment 2 - React Sign language Application

## Purpose
The purpose of the assignment was to utilize the React framework to build an application that can translate basic english(latin) sentences to sign language by supplying the user with images showing sign-language gestures corresponding to the letters of the phrase. The project also aimed to familiarize the developer with deployment of both a static React application and a JSON server to hosting services like Vercel and Railway.

## Technologies
- Language
  - JavaScript(JSX), HTML and CSS
- Framework
  - React (Router, DOM, ContextAPI)
  - Create-React-App for development and building
- Server
  - Simple JSON server with single db.json file
- Deployment & Hosting
  - Server
    - Railway
  - React application
    - Vercel
- Extra
  - React Alerts and Confirm Alerts
  - Fontawesome Icons by Twitter
- Created with
  - VSCode (Development environment)
  - Figma (Design)
  
## Structure
- public
  - Contains index.html file which acts as the root markup entry point for React
- src
  - components
    JavaScript and CSS for reusable components
  - individual_signs
    All individual PNG's of the sign language images
  - context
    Context providers for the React state
  - pages
    JavaScript and CSS for individual pages of the application

- wireframes-figma.pdf
  - Wireframes of the application created using figma
- component-tree-figma.pdf
  - Component tree model showing the general structure and relationships of the components used in the application, created using figma
  
## Run
Clone this repository and run the following commands in the root directory:
```
npm install --legacy-peer-deps
npm start
```

The reason for the "--legacy-peer-deps" is because the react-alert dependancy utilized in the project is not supported for React version of @17 or higher

### Creator 
Vegard46 (Vegard Andersson)
