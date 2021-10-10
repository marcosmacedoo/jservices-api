import * as admin from "firebase-admin";

const serviceAccount = require("../../../../jservices-7c3a6-firebase-adminsdk-ux3mu-efeaeb398a.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();
