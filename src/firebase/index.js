import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import firebaseConfig from './config';

// 設定を使って，firebaseを初期化する
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const FirebaseTimestamp = firebase.firestore.Timestamp; // タイムスタンプを取得できる．
export const provider = new firebase.auth.GoogleAuthProvider(); // プロバイダ オブジェクト
