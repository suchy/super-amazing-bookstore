const production = {
  graphQlUrl: 'https://super-amazing-bookstore.herokuapp.com/graphql'
};

const development = {
  graphQlUrl: 'http://localhost:4567/graphql'
};

export const getConfig = () => {
  if (process.env.NODE_ENV === 'production') {
    return production;
  }

  return development;
};
