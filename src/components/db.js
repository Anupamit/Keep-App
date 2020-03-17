import firebase from 'firebase';

class FirebaseWrapper{
  constructor(){
    let firebaseConfig = {
        apiKey: "AIzaSyDygdNd0gdX9fW6kTwvEKHtt5q8KpRrKWY",
        authDomain: "keep-anupamit.firebaseapp.com",
        databaseURL: "https://keep-anupamit.firebaseio.com",
        projectId: "keep-anupamit",
        storageBucket: "keep-anupamit.appspot.com",
        messagingSenderId: "271580976039",
        appId: "1:271580976039:web:9d723c4c7e0fb7f3e39c82",
        measurementId: "G-FE1SJPT7K7"
    };

    firebase.initializeApp(firebaseConfig);
    this.db = firebase.firestore();
    this.auth = firebase.auth();
    this.auth.onAuthStateChanged(this.checkLogin)
  }

  async insert(collectionName, row){
    row.uId = this.uuidv4()
    row.timestamp = new Date().getTime()
    let insert = await  this.db.collection(collectionName).doc(row.uId).set(row)
    return insert
  }

  async getAll(collectionName){
    let  snapshots = await this.db.collection(collectionName).get()
    let rows = []
    snapshots.forEach((doc) => {
      let row = doc.data();
      rows.push(row)
    })
    return rows
  }

  async delete(collectionName, docId){
    return await this.db.collection(collectionName).doc(docId).delete()
  }

  async update(collectionName, rowId, row){
    return this.db.collection(collectionName).doc(rowId).update(row)
  }

  async getRow(collectionName, rowId){
    let doc =  await this.db.collection(collectionName).doc(rowId).get()
    let data = doc.data()
    return data
  }
  async getRowsWhere(collectionName, whereKey, whereKeyValue){
    let snapshots =  await this.db.collection(collectionName)
    .where(whereKey, '==', whereKeyValue)
    .get()

    let rows = []
    snapshots.forEach((doc) => {
      let row = doc.data();
      rows.push(row)
    })
    return rows
  }

  async login(email, password){
    console.log(this.name);
    return await this.auth.signInWithEmailAndPassword(email, password)
  }

  async logout(){
    return await this.auth.signOut()
  }

  checkLogin(user){
    if(user){
      console.log('anp user', user.email, user);
    }
  }

  async signup(email, password){
    return await this.auth.createUserWithEmailAndPassword(email, password)
  }

  async sendResetPasswordEmail(email){
    return await this.auth.sendPasswordResetEmail(email)
  }

  getCurrentUser(){
      return this.auth.currentUser || {}
  }

  uuidv4() {
    let x = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    return Math.floor(new Date() / 1000)+"-"+ x;
  }
}

export default FirebaseWrapper;
