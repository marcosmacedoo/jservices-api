import * as admin from "firebase-admin";

const serviceAccount = require("../../../../programacao-para-internet-2-firebase-adminsdk-gagbd-890d080cf4.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();
