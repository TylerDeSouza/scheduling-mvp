// functions/src/index.ts

import * as functions from 'firebase-functions/v1';  // ← v1 import
import * as admin     from 'firebase-admin';

admin.initializeApp();

// 1) Give every new user the "client" role
export const setDefaultRole = functions.auth.user().onCreate(
  async (user: admin.auth.UserRecord) => {
    try {
      await admin.auth().setCustomUserClaims(user.uid, { role: 'client' });
      console.log(`Assigned client role to ${user.uid}`);
    } catch (err) {
      console.error('Error setting default role:', err);
    }
  }
);

// 2) Callable function for admins to change roles
export const setUserRole = functions.https.onCall(
  async (data: any, context: functions.https.CallableContext) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'You must be signed in to call this function'
      );
    }
    const callerRole = context.auth.token.role as string;
    if (callerRole !== 'admin') {
      throw new functions.https.HttpsError(
        'permission-denied',
        'Only admins can change roles'
      );
    }
    const { uid, role } = data as { uid?: string; role?: string };
    if (typeof uid !== 'string' || typeof role !== 'string') {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Expected data to have { uid: string; role: string }'
      );
    }
    try {
      await admin.auth().setCustomUserClaims(uid, { role });
      console.log(`Role for user ${uid} set to ${role}`);
      return { message: `Role ${role} set for user ${uid}` };
    } catch (err) {
      console.error('Error setting user role:', err);
      throw new functions.https.HttpsError('internal', 'Unable to set user role');
    }
  }
);