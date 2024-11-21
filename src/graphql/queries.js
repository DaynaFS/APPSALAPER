/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getEarthquake = /* GraphQL */ `
  query GetEarthquake($id: ID!) {
    getEarthquake(id: $id) {
      id
      magnitude
      location
      time
      reportedBy
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listEarthquakes = /* GraphQL */ `
  query ListEarthquakes(
    $filter: ModelEarthquakeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEarthquakes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        magnitude
        location
        time
        reportedBy
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getEarthquakeAlert = /* GraphQL */ `
  query GetEarthquakeAlert($id: ID!) {
    getEarthquakeAlert(id: $id) {
      id
      tweetId
      text
      date
      location
      magnitude
      source
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listEarthquakeAlerts = /* GraphQL */ `
  query ListEarthquakeAlerts(
    $filter: ModelEarthquakeAlertFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEarthquakeAlerts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        tweetId
        text
        date
        location
        magnitude
        source
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
