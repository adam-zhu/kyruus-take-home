# Kyruus Front End Interview

This repository contains the outline of a React front end web application. Please review the problem statement below and feel free to ask any clarifying questions to the recruiter.

This exercise is designed to be completed in 2-4 hours on average however it has no time limit. Feel free to spend as much time as you need designing and building a solution to satisfy the requirements. We recommend timeboxing the activity. Please treat it as if it were a new production system you were developing at work. We are looking for clean, readable, efficient, and maintainable code. Consider UI/UX, accessibility, and consider unit tests as you create your solution. When you finish, please send your code back to Kyruus for us to review in advance of your interview day. You are not limited to any particular CSS framework, component libraries or packages. Please note we will not be able to evaluate code utilizing 3rd party addins, components, etc. that are behind a paywall.

Please be prepared to discuss your work with members of the engineering team during the interview.

## Problem statement

We would like to build a simple customer facing reponsive UI to view, delete, and update a set of application users.

### Requirements

The user of the application should be able to

- View a list of users
- Delete a user
- Add a user
- Update a user name and e-mail

The application should

- Work on desktop and mobile
- Conform to WCAG 2.1 AA standards

Unit Tests

- Update any broken unit tests.
- Optional: Add new unit tests.

### User API spec

The User API adheres to the following API spec:

#### User Object

```js
{
  id: "string",
  name: "string",
  email: "email"
}
```

#### Endpoints

- GET `/users returns` `{ users: [ { array of user objects ]}`
- GET `/users/:id` returns a user object
- POST `/users` accepts `{ name: 'string', email: 'string'}`, returns a user object with an id
- DELETE `/users/:id` returns `{ success: true/false }`
- PATCH `/users/:id` returns `{ }`

## Getting started

This repository contains a react app that is bundled with webpack and is served with a built in development server. The public/index.html
already includes and mounts the react component in src/App.js.

### Prerequisites

- [git](https://git-scm.com/downloads)
- [Node.js 17.4.0](https://nodejs.org/en/download/)
- [npm 8.3.1] (bundled with node.js)

### Optional Package

- [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md) (nvm allows you to quickly install and use different versions of node via the command line.)

### Set Up

(optional) If using nvm run to setup your environment.

`$ nvm use`

First install the dependencies.

`$ npm install`

Then run the development server.

`$ npm start`

Start editing App.js!
The development server will rebuild and deploy automatically.

Run the back end server.

`$ npm run server`

Tests are scaffolded using [Jest](https://facebook.github.io/jest/docs/en/getting-started.html) and jsdom. Feel free to install other testing frameworks if desired. Run the tests.

`$ npm test`

### Extra Questions

- If the endpoint required authentication, how would you consider implementing this?
- What if we wanted the UI to update based on changes from the server?
