const express = require("express");
const AWS = require("aws-sdk");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

//Configuración de DynamoDB
AWS.config.update({
    region: "us-east-1", 
    accessKeyId: "", 
    secretAccessKey: ""
});

const docClient = new AWS.DynamoDB.DocumentClient();
const pinpoint = new AWS.Pinpoint();

// Configuración de Cognito???
const userPoolId = "us-east-1_ID_USER_POOL"; // ID del ser Pool
const region = "us-east-1"; 
const cognitoIssuer = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`;


app.use(bodyParser.json());

// Validacion del token de Cognito
const verifyCognitoToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: "Token no proporcionado." });

    jwt.verify(token, cognitoIssuer, (err, decoded) => {
        if (err) return res.status(401).json({ error: "Token inválido." });
        req.user = decoded;
        next();
    });
};

// Agregar un usuario
app.post("/users", verifyCognitoToken, async (req, res) => {
    const { user_id, user_name, user_email, user_phone, region, preferences } = req.body;

    const params = {
        TableName: "Users",
        Item: {
            user_id,
            user_name,
            user_email,
            user_phone,
            region,
            create_time: new Date().toISOString(),
            preferences
        }
    };

    try {
        await docClient.put(params).promise();
        res.status(201).json({ message: "Usuario agregado correctamente.", user_id });
    } catch (error) {
        console.error("Error al agregar el usuario:", error.message);
        res.status(500).json({ error: "Error al agregar el usuario." });
    }
});

//Agregar una alerta sísmica y enviar notificación con Pinpoint
app.post("/alerts", verifyCognitoToken, async (req, res) => {
    const { alert_id, magnitude, location, time, region, status, alert_message, phoneNumber } = req.body;

    const params = {
        TableName: "Alerts",
        Item: {
            alert_id,
            magnitude,
            location,
            time,
            region,
            status,
            alert_message
        }
    };

    try {
        // Guardar alerta en DynamoDB 
        await docClient.put(params).promise();

        // Enviar notificación usando Pinpoint
        const notificationParams = {
            ApplicationId: "tu-pinpoint-app-id", //ID de pinpoint???
            MessageRequest: {
                Addresses: {
                    [phoneNumber]: { ChannelType: "SMS" }
                },
                MessageConfiguration: {
                    SMSMessage: {
                        Body: `Alerta Sísmica: ${alert_message}`,
                        MessageType: "TRANSACTIONAL",
                        SenderId: "ALERTAS"
                    }
                }
            }
        };
        await pinpoint.sendMessages(notificationParams).promise();

        res.status(201).json({ message: "Alerta agregada y notificación enviada.", alert_id });
    } catch (error) {
        console.error("Error al procesar la alerta:", error.message);
        res.status(500).json({ error: "Error al procesar la solicitud." });
    }
});

app.get("/users/:id", verifyCognitoToken, async (req, res) => {
    const user_id = req.params.id;

    const params = {
        TableName: "Users",
        Key: { user_id }
    };

    try {
        const data = await docClient.get(params).promise();
        if (!data.Item) {
            return res.status(404).json({ error: "Usuario no encontrado." });
        }
        res.status(200).json(data.Item);
    } catch (error) {
        console.error("Error al obtener el usuario:", error.message);
        res.status(500).json({ error: "Error al obtener el usuario." });
    }
});

//Actualizar un usuario
app.put("/users/:id", verifyCognitoToken, async (req, res) => {
    const user_id = req.params.id;
    const { user_name, user_email, user_phone, region, preferences } = req.body;

    const params = {
        TableName: "Users",
        Key: { user_id },
        UpdateExpression:
            "SET user_name = :name, user_email = :email, user_phone = :phone, region = :region, preferences = :prefs",
        ExpressionAttributeValues: {
            ":name": user_name,
            ":email": user_email,
            ":phone": user_phone,
            ":region": region,
            ":prefs": preferences
        },
        ReturnValues: "ALL_NEW"
    };

    try {
        const data = await docClient.update(params).promise();
        res.status(200).json({ message: "Usuario actualizado correctamente.", updatedUser: data.Attributes });
    } catch (error) {
        console.error("Error al actualizar el usuario:", error.message);
        res.status(500).json({ error: "Error al actualizar el usuario." });
    }
});

// --------------------------------------------------

// Servidor escuchando en el puerto configurado
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:3000`);
});
