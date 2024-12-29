const AWS = require('aws-sdk');
const { Messaging } = require('firebase-admin'); // Si usas Firebase

//AWS Pinpoint 
const pinpoint = new AWS.Pinpoint({
  region: process.env.AWS_REGION,
});

const sendNotification = async (target, message) => {
  try {

    console.log('Enviando notificación a:', target);
    console.log('Mensaje:', message);

    const params = {
      ApplicationId: process.env.PINPOINT_APP_ID,
      MessageRequest: {
        Addresses: {
          [target]: {
            ChannelType: 'GCM',
          },
        },
        MessageConfiguration: {
          DefaultMessage: {
            Body: message.body,
            Title: message.title,
          },
        },
      },
    };

    const result = await pinpoint.sendMessages(params).promise();
    console.log('Resultado de la notificación:', result);
    return result;
  } catch (error) {
    console.error('Error enviando notificación:', error);
    throw error;
  }
};

module.exports = {
  sendNotification,
};
