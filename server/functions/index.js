const functions = require('firebase-functions'); // firefunction for deploying backend

// express app
const express = require('express');
const cors = require('cors');
///////////////////////////////////////

// Initialize Firebase
const firebase = require("firebase");
const { firestore } = require('firebase-admin');
require("firebase/firestore");
require("firebase/auth");
const firebaseConfig = {
  apiKey: "AIzaSyCReozHatzvLLpAZmwIOgR7WnL3x9fUa74",
  authDomain: "capstone-database2.firebaseapp.com",
  databaseURL: "https://capstone-database2-default-rtdb.firebaseio.com",
  projectId: "capstone-database2",
  storageBucket: "capstone-database2.appspot.com",
  messagingSenderId: "600067532776",
  appId: "1:600067532776:web:0038d2696e554062b9265d",
  measurementId: "G-PN315D00W3"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const users = db.collection("users");
const rooms = db.collection("rooms");
const devices = db.collection("devices");
const hubs = db.collection('hubs');

const currentUser = db.collection('currentUser');
//////////////////////////////////////

// Initialize Express App
const app = express();
app.use(cors({origin:true}));
//////////////////////////////////////

app.get("/", async (req, res) => {
  const snapshot = await currentUser.get();

  const getUser = snapshot.docs.map(doc => {
    let user = {}
    user = doc.data()
    user.id = doc.id
    return user
  })
  let result = {}

  let findUser = getUser.find(x => x.id === 'currentUser')
  if (findUser) result = findUser
  else result = getUser[0];

  let sendObj
  if (result.hasOwnProperty("data") && result.data === false) sendObj = null
  else sendObj = result.data
  res.send({data:sendObj});
});

app.post('/test', async (req,res) => {
  const data = req.body;
  await users.add(data);
  res.send({ msg: "User Added" });
});

// Create new account in firebase authentication and add new user to the users collection
app.post('/register', async(req,res) => {
  const data = req.body;
  try{
    const user = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password); // create new account

    let newUser = {};
    newUser.uid = user.user.uid;
    newUser.firstName = data.firstName;
    newUser.lastName = data.lastName;
    newUser.email = data.email;
    newUser.room = null;
    newUser.device = null;
    newUser.hub = null;
    newUser.role = "";

    let preference = {
      dt:"m", // device type
      msg:"Hello!",
      tP:25, // temperature preference
      fSP:1, // fan state preference
      fIP:100, // fan intensity preference
      lSP:1, // light state preference
      lIP:100, // light intensity preference
      r:1,
      g:1,
      b:1
    }

    newUser.userPreference = preference

    let autoId = await users.doc().id;
    newUser.id = autoId;
    // console.log('doc.id', autoId)

    // let ref = await users.doc();
    // console.log('ref', ref)

    await users.doc(autoId).set(newUser); // adding new user database 

    res.send({"success":true, "user":newUser}); // sending back suscess true and user information
  }catch(error) {
    res.send({"error":error});
  }
})

app.post('/checkLogin', async(req,res) => {
  const data = req.body
  try{
    const u = await firebase.auth().currentUser; 
    console.log('current user', u)
    if (u) {
      const snapshot = await hubs.where("uids", "array-contains", u.uid).get() // finding all the hubs that the user is in
      const qHubs = snapshot.docs.map(doc => {
        let hub = {}
        hub = doc.data()
        hub.id = doc.id
        return hub
      })

      const userSnapshot = await users.where("uid", "==", u.uid).get() // get all the users that has the correct uid should be 1 user only
      const queryUser = userSnapshot.docs.map(doc => {
        let newUser = {}
        newUser = doc.data()
        newUser.id = doc.id
        return newUser
      })

      if(queryUser.length) {
        let obj = queryUser[0];

        const preference = obj.userPreference;
        const infoObj = {
          user:obj.id,
          room:obj.room,
          device:obj.device
        };

        let data = Object.assign(preference,infoObj);
        const uPreference = await currentUser.doc("currentUser").update({data});
      }

      let rList = []
      if (qHubs.length && qHubs[0].rooms && qHubs[0].rooms.length) {
        const roomList = await rooms.where('id', 'in', qHubs[0].rooms).get() // get all rooms in hub
        const qRooms = roomList.docs.map(doc => {
          return doc.data()
        })
        rList = qRooms
      }
      let uList = []
      if (qHubs.length && qHubs[0].users && qHubs[0].users.length) {
        const userList = await users.where('id', 'in', qHubs[0].users).get() // get all users in hub
        const qUsers = userList.docs.map(doc => {
          return doc.data()
        })
        uList = qUsers
      }
      res.send({"success":true, "user":queryUser, "hubs":qHubs, "users":uList, "rooms":rList})
    }
    else {
      res.send({"success":true, user:null})
    }
  } catch(error) {
    res.send({"error":error});
  }
})

// Login and send back the hubs that the user is in information
app.post('/login', async (req, res) => {
  const data = req.body;

  try{
    const login = await firebase.auth().signInWithEmailAndPassword(data.email, data.password); 

    const snapshot = await hubs.where("uids", "array-contains", login.user.uid).get() // finding all the hubs that the user is in
    const qHubs = snapshot.docs.map(doc => {
      let hub = {}
      hub = doc.data()
      hub.id = doc.id
      return hub
    })

    const userSnapshot = await users.where("uid", "==", login.user.uid).get() // get all the users that has the correct uid should be 1 user only
    const queryUser = userSnapshot.docs.map(doc => {
      let newUser = {}
      newUser = doc.data()
      newUser.id = doc.id
      return newUser
    })

    if(queryUser.length) {
      let obj = queryUser[0];

      const preference = obj.userPreference;
      const infoObj = {
        user:obj.id,
        room:obj.room,
        device:obj.device
      };

      let data = Object.assign(preference,infoObj);
      const uPreference = await currentUser.doc("currentUser").update({data});
    }

    let rList = []
    if (qHubs.length && qHubs[0].rooms && qHubs[0].rooms.length) {
      const roomList = await rooms.where('id', 'in', qHubs[0].rooms).get() // get all rooms in hub
      const qRooms = roomList.docs.map(doc => {
        return doc.data()
      })
      rList = qRooms
    }
    let uList = []
    if (qHubs.length && qHubs[0].users && qHubs[0].users.length) {
      const userList = await users.where('id', 'in', qHubs[0].users).get() // get all users in hub
      const qUsers = userList.docs.map(doc => {
        return doc.data()
      })
      uList = qUsers
    }

    res.send({"success":true, "user":queryUser, "hubs":qHubs, "login":login, "users":uList, "rooms":rList});

  }catch(error) {
    res.send({"error":error});
  }
})

// Logout and send back the user information
app.post('/logout', async(req,res) => {
  const data = req.body;
  const logout = await firebase.auth().signOut()

  await currentUser.doc("currentUser").update({data:false})

  res.send({"success":true, "user":logout});
})

app.post('/readComplete', async(req, res) => {
  try{
    await currentUser.doc("currentUser").update({data:false})
    res.send({success:true})
  } catch(error) {
    res.send({"error":error})
  }
})

app.get('/getHub/:id', async(req,res) => { // user id
  try {
    const user = await users.doc(req.params.id).get().then((doc) => {
      return doc.data()
    })

    res.send({hubId:user.hub})
  } catch(error) {
    res.send({"error":error})
  }
})

app.post('/joinHub/:id', async(req,res) => { // hub id
  const data = req.body

  try {
    const hub = await hubs.doc(req.params.id).get().then((doc) => {
      return doc.data()
    })

    if (hub) {
      let userList = hub.users
      let uidList = hub.uids

      userList.push(data.user.id)
      uidList.push(data.user.uid)

      await hubs.doc(req.params.id).update({users:userList, uids:uidList})
      await users.doc(data.user.id).update({hub:req.params.id})
      res.send({success:true, data:hub})
    }
  } catch(error) {
    res.send({"error":error})
  }
})

app.post('/addHub/:id/:uid', async(req,res) => { // user id and user uid
  let data = req.body
  try {
    let newHub = {
      name:data.name,
      devices:[],
      rooms:[],
      users:[req.params.id],
      uids:[req.params.uid],
      id:""
    }

    let autoId = await hubs.doc().id;
    newHub.id = autoId

    await hubs.doc(autoId).set(newHub)
    await users.doc(req.params.id).update({hub:autoId, role:"admin"})
    res.send({success:true, data:newHub})
  } catch(error) {
    res.send({"error":error})
  }
})

app.post('/addRoom/:id/', async(req,res) => { //add room with the user id in the request
  const data = req.body // includes hub id
  try {
    let newRoom = {
      name:data.name,
      user:req.params.id,
      // device_mode:"",
      device:null,
      rt:0, // room temperature
      rb:0, // room brightness
      pow:0, // room power
      rh:0, // room humidity
      ra:false // room activity
    }

    let autoId = await rooms.doc().id;
    newRoom.id = autoId;

    await rooms.doc(autoId).set(newRoom) // add room to rooms collection

    await users.doc(req.params.id).update({room:autoId}) // add room id into user document

    const hub = await hubs.doc(data.hubId).get().then((doc) => { // push room id into the rooms array in the hub
      return doc.data()
    })

    let roomList = hub.rooms
    roomList.push(autoId)
    await hubs.doc(data.hubId).update({rooms:roomList})

    res.send({success:true, data:newRoom})
  } catch(error) {
    res.send({"error":error})
  }
})

app.post('/addDevice/:id/', async(req, res) => { // user id
  const data = req.body // includes hub id and room id

  try {
    let newDevice = {
      name:data.name,
      user:req.params.id,
      room:data.roomId,
      hub:data.hubId
    }

    const addedDevice = await devices.add(newDevice)
    
    await users.doc(req.params.id).update({device:addedDevice.id})

    await rooms.doc(data.roomId).update({device:addedDevice.id})

    const hub = await hubs.doc(data.hubId).get().then((doc) => {
      return doc.data()
    })

    let deviceList = hub.devices
    deviceList.push(addedDevice.id)
    await hubs.doc(data.hubId).update({devices:deviceList})

    res.send({success: true, device:newDevice, id:addedDevice.id})
  } catch (error) {
    res.send({"error":error})
  }
})

app.post('/updateUserPreference/:id', async(req, res) => {
  const dataObj = req.body
  try{
    await users.doc(req.params.id).update({userPreference:dataObj.userPreference})

    const preference = dataObj.userPreference
    const info = {
      user:req.params.id,
      room:dataObj.room,
      device:dataObj.device
    }

    let data = Object.assign(preference,info);
    const uPreference = await currentUser.doc("currentUser").update({data});

    res.send({success:true})
  }catch(error) {
    res.send({"error":error})
  }
})

app.post('/updateSensor', async(req, res) => {
  const data = req.body
  try {
    await rooms.doc(data.room).update({
      // device_mode:data.device_mode,
      rt:data.rt,
      rb:data.rb,
      pow:data.pow,
      rh:data.rh,
      ra:data.ra
    })
    res.send({success:true})
  }catch (error) {
    res.send({"error":error})
  }
})

app.get('/users/:id', async (req, res) => {
  const items = []

  const snapshot = await users.where("uid", "==", req.params.id).get()
  const getUsers = snapshot.docs.map(doc => {
    let user = {}
    user = doc.data()
    user.id = doc.id
    return user
  });

  res.send({"data":items, "users":getUsers});
})

app.get('/users/:id/getHub',  (req,res) => {
  const q = query(hubs, where("uids", "in", [req.params.id]));

  res.send({"id":req.params.id, "hubs":q});
})

// Create new hub
app.post('/hubs/create', async (req, res) => {
  // const data = req.body;
  // const hub = {};
  // hub.name = data.name;
  // hub.userIds = data.userIds;
  // hub.uids = data.uids;
  // hub.devices = data.devices;
  // hub.rooms = data.rooms;

  // const newHub = await hubs.add(hub);
  // res.send({"success":true, "hub":{"name":data.name, "userIds":data.userIds, "uids":data.uids, "devices":data.devices, "rooms":data.rooms, "id":newHub.id}});
  await hubs.add(req.body);
  res.send({"success":true});
})

app.get('/rooms/:id', async(req, res) => {
  try{
    const r = await rooms.doc(req.params.id).get().then((doc) => {
      return doc.data()
    })
    res.send({data:r})
  } catch(error) {
    res.send({'error':error})
  }
})

app.put('/rooms/:id', async(req, res) => {
  const data = req.body
  try {
    await rooms.doc(req.params.id).update({
      name:data.name
    })
    res.send({success:true})
  }catch (error) {
    res.send({"error":error})
  }
})

exports.app = functions.https.onRequest(app);
