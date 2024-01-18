# GitHub_FET_Quizzes
---

## General information
Made this repo to stage the development of my Cuvette FET project 2 - Quizzes. This is a Quiz making web application where we can create, analyze and share quizzes and polls  

Ideabook [Link](https://ideabook.club/share/fa8729bb-f4bf-4fad-b759-97c1c4bbf772/)
Figma [Link](https://www.figma.com/file/XYmWHdBvT55GOtfm9RAFCT/Quiz-Test-(Copy)?node-id=5%3A3380&mode=dev)

**Packages which might be helpful for the project:**
1. formik -  - [Link]('https://formik.org/')
2. axios - for better get and post requests from client - [website]('https://axios-http.com/docs/intro')
3. redux - for universal state management - [website]('https://redux.js.org/') 
4. Material UI - for getting ready made components for rapid frontend development [Will not be using this for this project]
5. Styles Components - for making using traditional CSS easier for the component age - [website](https://styled-components.com/docs) 
6. React Viz - for making graphs with animations - [website]('https://uber.github.io/react-vis/documentation/getting-started/installing-react-vis')
7. React Spring - for spring like animations - [website]('https://www.react-spring.dev/docs/getting-started')

---

## Client side

### Installations 

**Installations** 
1. initializing the react app
```
npx create-react-app .
```
2. installing react-router-dom : 
```
npm i react-router-dom
```
- for learning exact how to use the react router : Watch this [YTvideo](https://youtu.be/WNU1BEZIjxg?si=WaH3F-b1BL_DvxVV)

3. formik for handling forms 
```
npm i formik
```
4. yup for dead simple form validations 
```
npm i yup
```
for learning properly about form validation with formik and Yup watch [this](https://youtu.be/vJtyp1YmOpc?si=PwYv_1AoBigVTKkg) video

5. React Toastify for Displaying toasts notifications 
```

```
---

## Server Side 

### Installations
```
npm init -y 
npm i express ejs body-parser dotenv mongoose bcrypt cors jsonwebtoken 
```

### Need to make : 
1. We going to need EJS for rendering the shareable link pages with the quiz data 
---

## Planning for the project 

In this section I am putting down ideas and snippets which will help during the project development 

- A basic structure for my database model : 
```javascript
{
  userName: '',
  userEmail: '',
  userPassword: '',
  quizzesMade: [
    {
      quizId: '',
      impressions: '',
      shareLink: '',

      title: '',
      createdOn: '',
      quizType: '',
      questions: [
        {
          qid:'',
          questionText: '',
          optionsType:'',
          isTimed: 5,
          options: [
            {
              optionText: '',
              optionImg: '',
              isCorrect: false
            },
            // More options...
          ],
          // for analytics purposes
          attempts:'',
          answeredCorrect:'',
          answeredIncorrect:'',
        },
        // More questions...
      ]

    },
    // More quizzes...
  ],

  
}
```
- In this structure, each user has an **array of quizzes**. Each quiz has a title and an array of questions. Each question has a text and an array of answers. Each answer has a text and a flag indicating whether it's the correct answer.

---
## Learnings

### Exporting in React (and JS in general)
In React (and JavaScript in general), there are two types of exports: **named exports and default exports.**

1. Named Exports: You can have multiple named exports per module. Named exports are useful to export several values. During the import, one will use the same name to refer to a corresponding value.

Example:
```javascript
// file1.js
export const MyComponent = () => { ... }
export const MyOtherComponent = () => { ... }

// file2.js
import { MyComponent, MyOtherComponent } from './file1';
```

2. Default Exports: You can only have one default export per module. A default export can be a function, a class, an object or anything else. This value will be used by default when the module is imported.

Example:
```javascript
// file1.js
const MyComponent = () => { ... }
export default MyComponent;

// file2.js
import MyComponent from './file1';
```

In the provided context, `MyContext` and `MyProvider` are named exports from the first file, and `store` is a default export from the second file. The `setValue` function is a named export from the second file as well. 

When importing, you would use curly braces `{}` for named exports and no braces for default exports. If you want to import a named export along with a default export from the same module, you can do it like this:

```javascript
import DefaultExport, { NamedExport } from './file';
```
---

### Body-parser 
- it is an important package which is used for reading req.body and the most basic useage can be summarized here : 
```javascript
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// POST /login gets urlencoded bodies
app.post('/login', urlencodedParser, function (req, res) {
    res.send('welcome, ' + req.body.username);
});

// POST /api/users gets JSON bodies
app.post('/api/users', jsonParser, function (req, res) {
    // create user in req.body
});

module.exports = app;
```

---

## Context API for state management

- It does functionally the same thing as Redux.
- It creates a centralized context (Store in redux) where we store our states

**The thinking process for context api can be summarized in :** 
1. Create a Context 
2. Create a Context provider 
3. Wrap the Components which need that Context with it's provider (the component is generally a parent component of the component which needs the context)

**Steps for implementing context api :**
1. create a empty context :
   - Create a new file : src/context/contextName.js (or .jsx)
```javascript
// contextName.js
import React from 'react' ;
const UserContext = React.createContext();
export default UserContext;
```

1. Create a context provider files 
   - in src/context/contextNameProvider.js
```javascript
//contextNameProvider.js :-

import React, {useState} from 'react' ;
import UserContext from './UserContext'
const UserContextProvider = ({children}) => {
  // functionality comes here

  const [user, setUser] = useState(null)

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}

export default USerContextProvider
```
1. Making the App.js aware of the context by providing it with a wrapper
```javascript
import { userContextProvider } from './path_to_your_file/userContext';
function App() {
  
  return (
    <UserContextProvider>

      <reactComponent1>
      <reactComponent2>
      <reactComponent3>

    </UserContextProvider>

  )
}
```
4. Using the useContext hook to send & retrieve data from the context : 
  - inside a reactComponent in which you want to access the context to **set the context** values, we can code something like this:
```javascript
import React,{useState,useContext} from 'react

function login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const {setUser} = useContext(UserContext)  // fetch the setUser method from the UserContext

  const handleSubmit = (e) => {
    e.preventDefault()
    setUser({username, password})    
  }

  return (
    // form code here
  )
}
```
5. Similarly when we want to get the values from the context, we can code something like this:
```javascript
import React,{useContext} from 'react'
import UserContext from '../context/UserContext'

function Profile() {
  const {user} = useContext(UserContext)

  if(!user) return <h1> User not logged in</h1>

  return (
    <div>Profile : {user}
      <p>more components can be here</p>
    </div>

  )
} 

export default Profile
```

6. Both the contextName and contextNameProvider files can be combined into a single file with multiple exports : 
```javascript
import { useState, createContext } from 'react'

export const UserContext = createContext(null);

export const UserContextProvider = ({props}) => {
  // functionality comes here

  const [user, setUser] = useState(null)

  return (
    <UserContext.Provider value={{user, setUser}}>
      {props.children}
    </UserContext.Provider>
  )
} 
```
- now we can import the context and the contextProvider using the useContext Hook 

---

### React Spring Animations : 

Installations : 
```
npm i @react-spring/web
```
Importing : 
```javascript
import { animated } from '@react-spring/web'
```
The Hook 
```javascript
import { useSpring, animated } from '@react-spring/web'
```

---

### Problems with using JWT package in frontend :
- instead of using the default JWT package, we should use the jwt-decode package instead : 
```
npm i jwt-decode
```
- jwt-token usage in a short example :
```javascript
import { jwtDecode } from "jwt-decode";

const token = "eyJ0eXAiO.../// jwt token";
const decoded = jwtDecode(token);

console.log(decoded);
```
- these errors when using jwt in frontend mostly because of the nature of jwt which requires some core elements which are not there in non-browser environments.