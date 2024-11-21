/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onCreateTodo(filter: $filter) {
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
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onUpdateTodo(filter: $filter) {
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
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($filter: ModelSubscriptionTodoFilterInput) {
    onDeleteTodo(filter: $filter) {
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
export const onCreateEarthquake = /* GraphQL */ `
  subscription OnCreateEarthquake(
    $filter: ModelSubscriptionEarthquakeFilterInput
  ) {
    onCreateEarthquake(filter: $filter) {
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
export const onUpdateEarthquake = /* GraphQL */ `
  subscription OnUpdateEarthquake(
    $filter: ModelSubscriptionEarthquakeFilterInput
  ) {
    onUpdateEarthquake(filter: $filter) {
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
export const onDeleteEarthquake = /* GraphQL */ `
  subscription OnDeleteEarthquake(
    $filter: ModelSubscriptionEarthquakeFilterInput
  ) {
    onDeleteEarthquake(filter: $filter) {
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
export const onCreateEarthquakeAlert = /* GraphQL */ `
  subscription OnCreateEarthquakeAlert(
    $filter: ModelSubscriptionEarthquakeAlertFilterInput
  ) {
    onCreateEarthquakeAlert(filter: $filter) {
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
export const onUpdateEarthquakeAlert = /* GraphQL */ `
  subscription OnUpdateEarthquakeAlert(
    $filter: ModelSubscriptionEarthquakeAlertFilterInput
  ) {
    onUpdateEarthquakeAlert(filter: $filter) {
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
export const onDeleteEarthquakeAlert = /* GraphQL */ `
  subscription OnDeleteEarthquakeAlert(
    $filter: ModelSubscriptionEarthquakeAlertFilterInput
  ) {
    onDeleteEarthquakeAlert(filter: $filter) {
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
