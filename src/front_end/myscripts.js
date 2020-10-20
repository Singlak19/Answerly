  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCS_gMDiPnr4xoBGLcdFfZ8RL_Ff4SmH4k",
    authDomain: "answerly-17371.firebaseapp.com",
    databaseURL: "https://answerly-17371.firebaseio.com",
    projectId: "answerly-17371",
    storageBucket: "answerly-17371.appspot.com",
    messagingSenderId: "555938980709",
    appId: "1:555938980709:web:d4fb0426ec0fdbe5c0778c",
    measurementId: "G-YHRZYV7RTR"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // var uid = firebase.auth().currentUser.uid
  var final_files = [];
  var count=0
  var uid=0;
  var z=0;
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    uid = user.uid
    // var db = firebase.firestore();
    //   var docRef = db.collection("deyaPayusers").doc(user.uid);
    //   docRef.get().then(function(doc) {
    //      if(doc && doc.exists) {
    //      const myData = doc.data();
    //      const ffname = myData.FirstName;
    //      const llname = myData.LastName;
    //      const phonen = myData.PhoneNumber;
    //      document.getElementById("fname").value = ffname;
    //      document.getElementById("lname").value = llname;
    //      document.getElementById("phone").value = phonen;

    // }
    console.log(uid)
    // }).catch(function(error) {
    // console.log("Got an error: ",error);
    // });
  } else {
  	console.log("No user")
    // No user is signed in.
  }
});


  // let uid = user.uid
  		const ref = firebase.storage().ref();
		// const dbRef = firebase.database().ref();
		var fileselect = $id("fileselect"),
			filedrag = $id("filedrag"),
			submitbutton = $id("submitbutton");

		// file select
		fileselect.addEventListener("change", FileSelectHandler, false);

		// is XHR2 available?
		var xhr = new XMLHttpRequest();
		if (xhr.upload) {

			// file drop
			filedrag.addEventListener("dragover", FileDragHover, false);
			filedrag.addEventListener("dragleave", FileDragHover, false);
			filedrag.addEventListener("drop", FileSelectHandler, false);
			filedrag.style.display = "block";

			// remove submit button
			submitbutton.style.display = "none";
		}

  // firebase.analytics();
/*
filedrag.js - HTML5 File Drag & Drop demonstration
Featured on SitePoint.com
Developed by Craig Buckler (@craigbuckler) of OptimalWorks.net
*/
// import firebase from 'firebase/app';
// import 'firebase/firestore';

// var config = {
//   apiKey: "AIzaSyCS_gMDiPnr4xoBGLcdFfZ8RL_Ff4SmH4k",
//     authDomain: "answerly-17371.firebaseapp.com",
//     databaseURL: "https://answerly-17371.firebaseio.com",
//     projectId: "answerly-17371",
//     storageBucket: "answerly-17371.appspot.com",
//     messagingSenderId: "555938980709",
//     appId: "1:555938980709:web:d4fb0426ec0fdbe5c0778c",
//     measurementId: "G-YHRZYV7RTR"
// };
 // const ref = firebase.storage().ref();
// Initialize Firebase
// firebase.initializeApp(config);

  // Get a reference to the database service
// var database = firebase.database();

// (function() {

	// getElementById
	function $id(id) {
		return document.getElementById(id);
	}


	// output information
	function Output(msg) {
		var m = $id("messages");
		m.innerHTML = msg + m.innerHTML;
	}


	// file drag hover
	function FileDragHover(e) {
		e.stopPropagation();
		e.preventDefault();
		e.target.className = (e.type == "dragover" ? "hover" : "");
	}


	// file selection
	function FileSelectHandler(e) {

		// cancel event and hover styling
		FileDragHover(e);

		// fetch FileList object
		var files = e.target.files || e.dataTransfer.files;
		final_files.push.apply(final_files,files);
// const storage = firebase.storage();
		// const ref = firebase.storage().ref();
		// process all File objects

      console.log(uid)
      
      firebase.database().ref(uid).child('Training_Data').once("value", function(snapshot) {
      			// z=1;
	    		count = snapshot.numChildren()
	    		if(z==1){
	    			count = count -1
	    		}
	    		console.log(count)
	    		firebase.database().ref(uid).child('Training_Data').child(String(count)).child("answer").set(document.getElementById("ideal_answer").value)
	    		// String c
	    		z=1;
	    		
	    		// return;
  // console.log("There are "+snapshot.numChildren()+" messages");
	  });
	  for (var i = 0, f; f = files[i]; i++) {

			// const image = f;

  // path.put(image).then(function() {
  //   path.getDownloadURL().then(function(url) {
  //     alert(url);
  //   }
  // }
  const storage = firebase.storage();
			const file = f;
			ParseFile(f);
		}
      // if(firebase.database().ref(uid).child('Training_Data').getRoot()!=null){
      	// firebase.database().ref().child(uid).child('Training_Data').set({0:0})
      // 	// console.log("yaya")
      // 	// var d = {
      // 	// 	answer: document.getElementById("ideal_answer")
      // 	// }
      // 	// console.log(document.getElementById("ideal_answer").value)
      // 	firebase.database().ref().child(uid).child('Training_Data').set({"answer":document.getElementById("ideal_answer").value})
	     //  	// firebase.database().ref(uid).child('Training_Data').set(d)
      	
      // }
      // else{
      // 	console.log("P")
      // }
		

	}
// }


	// output file information
	async function onSubmit(){
		var res = '';
		console.log("IIIIIIIIIIII")
		
		for (var i = 0, f; f = final_files[i]; i++) {
			console.log(String(i))
			// const image = f;
let p = Promise.resolve();
  // path.put(image).then(function() {
  //   path.getDownloadURL().then(function(url) {
  //     alert(url);
  //   }
  // }
  const storage = firebase.storage();
			const file = f;
			const name = (+new Date()) + '-' + file.name;
			const metadata = { contentType: file.type };
			var uploadPromises = [];
			const task = ref.child(name).put(file, metadata);

//       storage.ref(name).getDownloadURL().then((url) => { 
//       	// firebase.database().ref(uid/'Training_Data').Add({url,-1})
//       	if(firebase.database().ref(uid).child('Training_Data').getRoot()==null){
// 	      	firebase.database().ref(uid/'Training_Data').child(url).setValue("-1")
// 	    }
// 	    else{
// 	    	console.log(url)
// 	    	firebase.database().ref(uid).child('Training_Data').set({0:0})
// 	    	exports.setCount = functions.database.ref(uid/'Training_Data').onWrite(event => {
//     return event.data.ref.parent.once("value", (snapshot) => {
//       const count = snapshot.numChildren();
//       console.log(count)
//       return event.data.ref.update({ count });
//     });
// })
// 	    	// firebase.database().ref(uid).child('Training_Data').addListenerForSingleValueEvent(new ValueEventListener() {
//       // //           @Override
//       // //           public void onDataChange(DataSnapshot dataSnapshot) {
//       // //              long count= dataSnapshot.getChildrenCount();
//       // //              count = count +1
//       // //              firebase.database().ref(uid).child('Training_Data').set({string(count):url})
//       // //           }  
//       //        });
// 	    }
//   });
    // }
  // )
			// const storage = firebase.storage();
			 uploadPromises.push(
			 	new Promise((resolve, reject) => {

task.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          function (snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
          },
          function () {
            task.snapshot.ref.getDownloadURL()
              .then(function(url) {
                  // console.log('File available at', downloadURL);
                  var snapshot =  firebase.database().ref(uid).child('Training_Data').child(String(count)).once('value');
	    	if(snapshot.exists()){
	    		var count2 =  snapshot.numChildren()
	    		console.log(count2)
	    		var x =  firebase.database().ref(uid).child('Training_Data').child(String(count)).child(String(count2)).child("url").set(url)
	    		var y =  firebase.database().ref(uid).child('Training_Data').child(String(count)).child(String(count2)).child("name").set(file.name)
	    		    // let getData = await new Promise((resolve, reject) => {resolve('xx')})
}
                  resolve()
              });
          }
        );

// 			task.on('state_changed',
//     function progress (snapshot) {
//       self.status = 'UPLOADING...'
//       self.percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//     },
//     function error () {
//       self.status = 'FAILED TRY AGAIN!'
//       self.isUploading = false
//     },

//     async function complete (event) {
//       self.status = 'UPLOAD COMPLETED'
//       self.isUploading = false


// var url = await storage.ref(name).getDownloadURL()
// // .then(async function(url) { 
//       	// firebase.database().ref(uid/'Training_Data').Add({url,-1})
//      //  	if(firebase.database().ref(uid).child('Training_Data').getRoot()==null){
// 	    //   	firebase.database().ref(uid/'Training_Data').child(url).setValue("-1")
// 	    // }
// 	    // else{
// 	    	console.log(count)
// 	    	// firebase.database().ref(uid).child('Training_Data').set({0:0})
// 	    	p = await p.then(async()=>{
// 	    	var snapshot = await firebase.database().ref(uid).child('Training_Data').child(String(count)).once('value');
// 	    	if(snapshot.exists()){
// 	    		var count2 =  snapshot.numChildren()
// 	    		console.log(count2)
// 	    		var x = await firebase.database().ref(uid).child('Training_Data').child(String(count)).child(String(count2)).child("url").set(url)
// 	    		var y = await firebase.database().ref(uid).child('Training_Data').child(String(count)).child(String(count2)).child("name").set(file.name)
// 	    		    // let getData = await new Promise((resolve, reject) => {resolve('xx')})
// }
//     				// let xx = await getData; 
// 	    		// String c
	    		
// 	    		// return;
//   // console.log("There are "+snapshot.numChildren()+" messages");
// 	    });
// 	    	// firebase.database().ref(uid).child('Training_Data').child(String(count)).set(url)
// 	    	// firebase.database().ref(uid).child('Training_Data').addListenerForSingleValueEvent(new ValueEventListener() {
//       // //           @Override
//       // //           public void onDataChange(DataSnapshot dataSnapshot) {
//       // //              long count= dataSnapshot.getChildrenCount();
//       // //              count = count +1
//       // //              firebase.database().ref(uid).child('Training_Data').set({string(count):url})
//       // //           }  
//       //        });
// 	    // }
//   // });
// // 			const storage = firebase.storage();

// // storage.ref(name).getDownloadURL()
// //   .then((url) => {
// //   	console.log(url)
// //     // Do something with the URL ...
// //   })
			
// 			// task.then((snapshot) => {
//    //  console.log(snapshot.downloadURL); });
// 			// task
//    //  .then((snapshot) => {
//    //    document.querySelector('#someImageTagID').src = snapshot.downloadURL;
//    //  })
//     // .catch((error) => {
//     //   // A list of errors can be found at
//     //   // https://firebase.google.com/docs/storage/web/handle-errors
//     //   switch (error.code) {
//     //     case 'storage/unauthorized':
//     //       // User doesn't have permission to access the object
//     //       break;
//     //     case 'storage/canceled':
//     //       // User canceled the upload
//     //       break;
//     //     // ...
//     //     case 'storage/unknown':
//     //       // Unknown error occurred
//     //       break;
//     //   }
//     })

			// ParseFile(f);
		})
		)
  await Promise.all(uploadPromises)
		}

		return res;
	}
	function ParseFile(file) {

		Output(
			"<p>File information: <strong>" + file.name +
			"</strong> type: <strong>" + file.type +
			"</strong> size: <strong>" + file.size +
			"</strong> bytes</p>"
		);

	}
	// initialize
	// function Init() {
		// import * as firebase from 'firebase';
// import * as firebase from 'firebase/app';
// import 'firebase/firestore';
// const firebase = require('firebase-admin');
// const firebase = require('firebase-admin');
// var firebase = require('firebase-app');
// var config = {
//   apiKey: "AIzaSyCS_gMDiPnr4xoBGLcdFfZ8RL_Ff4SmH4k",
//     authDomain: "answerly-17371.firebaseapp.com",
//     databaseURL: "https://answerly-17371.firebaseio.com",
//     projectId: "answerly-17371",
//     storageBucket: "answerly-17371.appspot.com",
//     messagingSenderId: "555938980709",
//     appId: "1:555938980709:web:d4fb0426ec0fdbe5c0778c",
//     measurementId: "G-YHRZYV7RTR"
// };
		// // const ref = firebase.storage().ref();
		// // const dbRef = firebase.database().ref();
		// var fileselect = $id("fileselect"),
		// 	filedrag = $id("filedrag"),
		// 	submitbutton = $id("submitbutton");

		// // file select
		// fileselect.addEventListener("change", FileSelectHandler, false);

		// // is XHR2 available?
		// var xhr = new XMLHttpRequest();
		// if (xhr.upload) {

		// 	// file drop
		// 	filedrag.addEventListener("dragover", FileDragHover, false);
		// 	filedrag.addEventListener("dragleave", FileDragHover, false);
		// 	filedrag.addEventListener("drop", FileSelectHandler, false);
		// 	filedrag.style.display = "block";

		// 	// remove submit button
		// 	submitbutton.style.display = "none";
		// }

	// }

	// call initialization file
	// if (window.File && window.FileList && window.FileReader) {
	// 	// import * as firebase from 'firebase/app';
	// 	Init();
	// }


// })();