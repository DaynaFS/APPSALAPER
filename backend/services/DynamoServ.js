const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.DYNAMO_DB_TABLE;

const putItem = async (item) => {
  const params = {
    TableName: TABLE_NAME,
    Item: item,
  };

  return dynamoDb.put(params).promise();
};

const getAllItems = async () => {
  const params = {
    TableName: TABLE_NAME,
  };

  const data = await dynamoDb.scan(params).promise();
  return data.Items;
};

module.exports = {
  putItem,
  getAllItems,
};
