# GitHub_FET_Quizzes
---

## General information
Made this repo to stage the development of my Cuvette FET project 2 - Quizzes. This is a Quiz making web application where we can create, analyze and share quizzes and polls  

**Packages which might be helpful for the project:**
1. formik -  - [Link]('https://formik.org/')
2. axios - for better get and post requests from client - [website]('https://axios-http.com/docs/intro')
3. redux - for universal state management - [website]('https://redux.js.org/') 
4. Material UI - for getting ready made components for rapid frontend development [Will not be using this for this project]
5. Styles Components - for making using traditional CSS easier for the component age - [website](https://styled-components.com/docs) 

---

## Client side

### Installations 

**Installations** 
1. initializing the react app
```
npx create-react-app .
```
2. installing styles-components 
```
npm install styled-components
```
3. installing redux toolkit for react 
```
npm install @reduxjs/toolkit
npm install react-redux
```
---

## Server Side 


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

### Redux 
- is a centralized state management library
- it has a unidirectional data flow 
- it is like a global single source of state 
- it is read only
- Changes are made using specialized functions called reducers 
- NOTE: it is a predictable state container for js apps (not just react apps)
- It comes with the following parts : 
  - **store :** a (kinda global variable) in which all the states wil be stored. These can have smaller stores/ sections to them 
  - **Reducers :** are the functions which make changes to the store and it's subsections
  - **useSelector :** for when we want to select some property from the store 
  - **useDispatch :** 

- **The 3 Core Concepts of Redux are :**
  1. `Store` : holds the state of our application
  2. `Action` : describes what has happened
  3. `Reducers` : ties the store and action together 

- **The 3 Core Principles of Redux are :**
  1. _The global state of your application is stored as an object inside a single store_ - maintain our application state in a single `object` which would be managed by the Redux `store`.
  2. _The only way to change the state is to dispatch an action, an object that describes what happened_ - To update the state of your app, you need to let Redux know about that with an `action`. You are **Not** allowed to directly update the state object.
  3. _To specify how the state tree is updated based on actions, you write pure reducers_
  ```
  Reducer - (previousState, action) => newState
  ```
---
#### Actions
- The only way your application can interact with the store
- Carry some information from your app to the redux store
- Plain JavaScript objects
- Must have a 'type' property that describes something that happened in the application.
- The 'type' property is typically defined as string constants


Installations : 
```
npm install @reduxjs/toolkit
npm install react-redux
```
- Then make a file src/app/store
- In it add the below code to initial and setup the store : 
```
import {configureStore} from '@reduxjs/toolkit';
export const store = configureStore({})
```
- Next we make the reducers(slices in Redux Toolkit)
- We made a new file : src/feature/quiz/quizSlice.js
- inside it we import the createSlice method (and nanoid) and define the slice inside it 
```
import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    user: [{id: none, name:Bunny}]
}

export const quizSlice = createSlice({
    name: 'quizSlice',
    initialState: initialState,
    reducers: {
        // properties and functions here 
        
        setUser: (state, action) => {},
        removeUSer: (state, action) => {},
    }
})
```
- **always** remember that when we are making the reducers methods , we get access to 2 variables : 
  1. state - what is the current state looking like
  2. action - to access what data was sen by the component 
- Eg : 
```

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
- now we can import the context and the contextProvider  using the useContext Hook 