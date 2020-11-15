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

      console.log(uid)

	  for (var i = 0, f; f = files[i]; i++) {
  const storage = firebase.storage();
			const file = f;
			ParseFile(f);
		}


	}

	// output file information
	async function onSubmit(){

		var url_vector=[]
		var ideal_answer_var = document.getElementById("ideal_answer").value
firebase.database().ref(uid).child('Training_Data').once("value", function(snapshot) {
            // z=1;
          count = snapshot.numChildren()
          // if(z==1){
            // count = count -1
          // }
          console.log(count)
          firebase.database().ref(uid).child('Training_Data').child(String(count)).child("answer").set(document.getElementById("ideal_answer").value)
          // String c
          // z=1;

          // return;
  // console.log("There are "+snapshot.numChildren()+" messages");
    });

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
			const task = ref.child(name).put(f, metadata);

uploadPromises.push(
			 	new Promise((resolve, reject) => {

task.on('state_changed', function(snapshot){
            var progress =
             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              // var uploader = document.getElementById('uploader');
              // uploader.value=progress;
              switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                  console.log('Upload is paused');
                  break;
                case firebase.storage.TaskState.RUNNING:
                  console.log('Upload is running');
                  break;
              }
          }, function(error) {console.log(error);
          }, function() {

               // get the uploaded image url back
               task.snapshot.ref.getDownloadURL().then(
                function(downloadURL) {
  				url_vector.push(downloadURL);
               // You get your url from here
                console.log('File available at', downloadURL);

                firebase.database().ref(uid).child('Training_Data').child(String(count)).once('value',(snapshot) =>{
	    		var count2 =  snapshot.numChildren()
	    		console.log(count2)
	    		var x =  firebase.database().ref(uid).child('Training_Data').child(String(count)).child(String(count2)).child("url").set(downloadURL)
	    		var y =  firebase.database().ref(uid).child('Training_Data').child(String(count)).child(String(count2)).child("name").set(file.name)
	    		    // let getData = await new Promise((resolve, reject) => {resolve('xx')})
});
  resolve()
            });
          });
})
			 	);

  await Promise.all(uploadPromises)
		}

		return res;
	}


async function onSubmit2(){

		var url_vector=[]
		var ideal_answer_var = document.getElementById("ideal_answer").value


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

uploadPromises.push(
			 	new Promise((resolve, reject) => {

task.on('state_changed', function(snapshot){
            var progress =
             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              // var uploader = document.getElementById('uploader');
              // uploader.value=progress;
              switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                  console.log('Upload is paused');
                  break;
                case firebase.storage.TaskState.RUNNING:
                  console.log('Upload is running');
                  break;
              }
          }, function(error) {console.log(error);
          }, function() {

               // get the uploaded image url back
               task.snapshot.ref.getDownloadURL().then(
                function(downloadURL) {
  				url_vector.push(downloadURL);
               // You get your url from here
                console.log('File available at', downloadURL);

  resolve()
            });
          });
})
			 	);

  await Promise.all(uploadPromises)
		}

		return res;
	}


  async function onSubmit3(){
		console.log("rrrrrrrr")
		var url_vector=[]
		var name_vector=[]
		var ideal_answer_var = document.getElementById("ideal_answer").value
firebase.database().ref(uid).child('Testing_Data').once("value", function(snapshot) {
            // z=1;
          count = snapshot.numChildren()
          // if(z==1){
            // count = count -1
          // }
          console.log(count)
          firebase.database().ref(uid).child('Testing_Data').child(String(count)).child("answer").set(document.getElementById("ideal_answer").value)
          // String c
          // z=1;

          // return;
  // console.log("There are "+snapshot.numChildren()+" messages");
    });

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

uploadPromises.push(
			 	new Promise((resolve, reject) => {

task.on('state_changed', function(snapshot){
            var progress =
             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              // var uploader = document.getElementById('uploader');
              // uploader.value=progress;
              switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                  console.log('Upload is paused');
                  break;
                case firebase.storage.TaskState.RUNNING:
                  console.log('Upload is running');
                  break;
              }
          }, function(error) {console.log(error);
          }, function() {

               // get the uploaded image url back
               task.snapshot.ref.getDownloadURL().then(
                function(downloadURL) {
  				url_vector.push(downloadURL);
  				name_vector.push(file.name);

               // You get your url from here
                console.log('File available at', downloadURL);

                firebase.database().ref(uid).child('Testing_Data').child(String(count)).once('value',(snapshot) =>{
	    		var count2 =  snapshot.numChildren()
	    		console.log(count2)
	    		var x =  firebase.database().ref(uid).child('Testing_Data').child(String(count)).child(String(count2)).child("url").set(downloadURL)
	    		var y =  firebase.database().ref(uid).child('Testing_Data').child(String(count)).child(String(count2)).child("name").set(file.name)
	    		    // let getData = await new Promise((resolve, reject) => {resolve('xx')})
data={'url':downloadURL,'firebase_unique_id':uid,'ideal_answer':ideal_answer_var}
  var start_point="http://127.0.0.1:8000/ml_model"
  var request=new XMLHttpRequest();
  request.open("POST",start_point,true);
  request.send(JSON.stringify(data))
  request.onload = function() {
    let response=request.response;
    // console.log(response)
    var json_response=JSON.parse(request.responseText)
    console.log(json_response.ans)
    // console.log(response['ans'])
    firebase.database().ref(uid).child('Testing_Data').child(String(count)).child(String(count2)).child("marks_given").set(response.ans)
    // ans_vector.push(response.ans)
  }
});
  resolve()
            });
          });
})
			 	);

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
