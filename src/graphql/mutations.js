/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
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
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
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
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
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
export const createEarthquake = /* GraphQL */ `
  mutation CreateEarthquake(
    $input: CreateEarthquakeInput!
    $condition: ModelEarthquakeConditionInput
  ) {
    createEarthquake(input: $input, condition: $condition) {
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
export const updateEarthquake = /* GraphQL */ `
  mutation UpdateEarthquake(
    $input: UpdateEarthquakeInput!
    $condition: ModelEarthquakeConditionInput
  ) {
    updateEarthquake(input: $input, condition: $condition) {
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
export const deleteEarthquake = /* GraphQL */ `
  mutation DeleteEarthquake(
    $input: DeleteEarthquakeInput!
    $condition: ModelEarthquakeConditionInput
  ) {
    deleteEarthquake(input: $input, condition: $condition) {
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
export const createEarthquakeAlert = /* GraphQL */ `
  mutation CreateEarthquakeAlert(
    $input: CreateEarthquakeAlertInput!
    $condition: ModelEarthquakeAlertConditionInput
  ) {
    createEarthquakeAlert(input: $input, condition: $condition) {
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
export const updateEarthquakeAlert = /* GraphQL */ `
  mutation UpdateEarthquakeAlert(
    $input: UpdateEarthquakeAlertInput!
    $condition: ModelEarthquakeAlertConditionInput
  ) {
    updateEarthquakeAlert(input: $input, condition: $condition) {
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
export const deleteEarthquakeAlert = /* GraphQL */ `
  mutation DeleteEarthquakeAlert(
    $input: DeleteEarthquakeAlertInput!
    $condition: ModelEarthquakeAlertConditionInput
  ) {
    deleteEarthquakeAlert(input: $input, condition: $condition) {
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
