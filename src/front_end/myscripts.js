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
// const storage = firebase.storage();
		// const ref = firebase.storage().ref();
		// process all File objects
		for (var i = 0, f; f = files[i]; i++) {

			// const image = f;

  // path.put(image).then(function() {
  //   path.getDownloadURL().then(function(url) {
  //     alert(url);
  //   }
  // }
			const file = f;
			const name = (+new Date()) + '-' + file.name;
			const metadata = { contentType: file.type };
			const task = ref.child(name).put(file, metadata);
			const storage = firebase.storage();
			task.on('state_changed',
    function progress (snapshot) {
      self.status = 'UPLOADING...'
      self.percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    },
    function error () {
      self.status = 'FAILED TRY AGAIN!'
      self.isUploading = false
    },

    function complete (event) {
      self.status = 'UPLOAD COMPLETED'
      self.isUploading = false
      storage.ref(name).getDownloadURL().then((url) => { firebase.database().ref('answers').set({url:url})})
    }
  )
// 			const storage = firebase.storage();

// storage.ref(name).getDownloadURL()
//   .then((url) => {
//   	console.log(url)
//     // Do something with the URL ...
//   })
			
			// task.then((snapshot) => {
   //  console.log(snapshot.downloadURL); });
			// task
   //  .then((snapshot) => {
   //    document.querySelector('#someImageTagID').src = snapshot.downloadURL;
   //  })
    // .catch((error) => {
    //   // A list of errors can be found at
    //   // https://firebase.google.com/docs/storage/web/handle-errors
    //   switch (error.code) {
    //     case 'storage/unauthorized':
    //       // User doesn't have permission to access the object
    //       break;
    //     case 'storage/canceled':
    //       // User canceled the upload
    //       break;
    //     // ...
    //     case 'storage/unknown':
    //       // Unknown error occurred
    //       break;
    //   }
    // })

			ParseFile(f);
		}

	}


	// output file information
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