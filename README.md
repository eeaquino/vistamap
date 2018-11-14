# Overview

This project is the final project for Udacity FEND nanodegree  
It's purpose is to teach the use of APIs and react.  

## How to use
Navigate to the directory in cmd or powershell and run npm start, if you do not have npm and node installed plese review their docuemntation at [Node](https://nodejs.org/)  
The app will load automatically in the browser, then you can click onany of the options on top (Food,Parks,Gas) to find places related to those categories. You can then click on the search icon to filter them, or click on any item to view more details.  

All data returned from API is stored in indexedDB for offline use.

## API Used
Foursquare API  
Google Maps API using google-maps-react  

## Other dependencies
[mdbootstrap](https://mdbootstrap.com/docs/react/getting-started/download/) for material ui purposes  .Install using  npm install mdbreact  
[LZ-String](https://github.com/pieroxy/lz-string) for data compression. Install using npm install  lz-string  

## Notes
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Service Worker will only work on the production build. Please use npm run build and move the files on dist to your server to test out. 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

