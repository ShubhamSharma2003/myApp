import * as firebase from 'firebase';

const firebaseConfig = {
	apiKey:ApiKey,
	authDomain:AuthDomain,
	projectId:ProjectId,
	storageBucket:StorageBucket,
	messagingSenderId:MessagingSenderId,
	appId:AppId,
	measurementId:MeasurementId,
  };

firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;
