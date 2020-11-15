# Super amazing bookstore

[![Netlify Status](https://api.netlify.com/api/v1/badges/3119520c-d049-4b04-ac51-1e9ecabcaf6d/deploy-status)](https://app.netlify.com/sites/super-amazin-bookstore/deploys)

Super amazing bookstore is simple application to display, add and edit books. It talks to backend using GraphQl.

You can check it online: [https://super-amazin-bookstore.netlify.app/](https://super-amazin-bookstore.netlify.app/)

## Local development

1. Clone repository `git clone git@github.com:suchy/super-amazing-bookstore.git`

2. Install dependecies `cd super-amazing-bookstore && npm install`

Super amazing bookstore is using `create-react-app`:

- to run it use command: `npm start`

- to build production bundle run `npm run build`

- to run tests run `npm run cypress`

On local machine you should run also [https://github.com/suchy/apollo-test-app](https://github.com/suchy/apollo-test-app) to make frontend talking to GraphQL server.
