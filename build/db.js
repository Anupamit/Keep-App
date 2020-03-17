class FirebaseWrapper{
  constructor(){
    let firebaseConfig = {
      apiKey: "AIzaSyCgxanprg7ChdLXDuRzW9iD-JPru3WhDAM",
      authDomain: "dailyhishab.firebaseapp.com",
      databaseURL: "https://dailyhishab.firebaseio.com",
      projectId: "dailyhishab",
      storageBucket: "dailyhishab.appspot.com",
      messagingSenderId: "900223792040",
      appId: "1:900223792040:web:a6f6d4ce0ed6ec367ba39d",
      measurementId: "G-XTBS2QPP0W"
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
    } else if(!user && !(location.pathname === '/index.html' || location.pathname === '/' || location.pathname === '/C:/Users/ektai/Documents/dailyhishab/index.html' || location.pathname === `signUpPage.html` || location.pathname ===`/C:/Users/ektai/Documents/dailyhishab/signUpPage.html`)) {
      console.log('anp not logged in', location.pathname);
      location.href = 'index.html'
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

const firebaseWrapper = new FirebaseWrapper()

async function logout(){
  console.log('anp logout');
  await firebaseWrapper.logout()
}
