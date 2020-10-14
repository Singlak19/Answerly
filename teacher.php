<!DOCTYPE html>
<html>
<body>

<!--<h1>Reached User.php</h1>-->

<?php

/*
function  createConfirmationmbox($msg, $url){
    echo '<script type="text/javascript"> ';
    echo ' function openurl() {';
    echo '  if (confirm("$msg")) {';
    echo '    document.location = $url;';
    echo '  }';
    echo '}';
    echo '</script>';

}
*/
	#echo "Reached1";
	print_r($_POST);
    #echo $_POST;

	if ($_POST[login] == "LOGIN")
	{

		$log_email= $_POST['lemail'];
		$log_password= $_POST['lpassword'];
		echo "$log_email";

		$conn= mysqli_connect('localhost', 'root', 'soumyamysql', 'answerly');

		$e_sql= "SELECT * FROM teacher_login WHERE EMAIL= '$log_email' and PASSWORD= '$log_password'";
		$e_result= mysqli_query($conn, $e_sql);

		if (mysqli_num_rows($e_result) > 0 )
		{
			//include("userhome.php");

			echo "This account does exist in the database";
		}
		else
		{
			echo '<script type="text/javascript">';
			echo ' alert("Invalid Email/Password !");  document.location=   "http://localhost/answerly/"; ';  //not showing an alert box.
			echo '</script>';
		}
	} 
	#echo 'Not entered isset';
	elseif (isset($_POST[register]))
	{
		$name= $_POST['name'];
		$email_id= $_POST['semail'];
		$pswd1= $_POST['spassword'];
		$pswd2= $_POST['cpassword'];

		echo 'Entered isset';
	//Database connection

	$conn= mysqli_connect('localhost', 'root','soumyamysql', 'answerly');

	$sql_e= "SELECT * FROM teacher_login WHERE EMAIL= '$email_id';";
	$res_e= mysqli_query($conn, $sql_e);
	print_r($res_e);

    echo $sql_e;
	if(mysqli_num_rows($res_e) > 0)
	{
		echo "Email already exists";
		echo '<script type="text/javascript">';
		echo ' alert("This email already exists!");  document.location = "http://localhost/answerly/"; ';  //not showing an alert box.
		echo '</script>';
  	  #echo "Sorry... email already taken"; 
  	}

  	else
  	{
  		echo "Reached Else 1";
  		if($pswd1 == $pswd2)
  		{
  			echo "Passwrod matched $pswd1";
	  		if (mysqli_connect_errno()) 
	  		{
	  			echo "Failed to connect to MySQL: " . mysqli_connect_error();
	  			exit();
			} 
			else 
			{
				$sql_querry = "INSERT INTO `teacher_login` (`NAME`, `EMAIL`, `PASSWORD`) VALUES ('$name', '$email_id', '$pswd1');";
				echo $sql_querry;

				$stmt= mysqli_query($conn, $sql_querry);

				if($stmt)
				{
					mysqli_close($conn);
					echo '<script type="text/javascript">';
					echo ' alert("You have been successfully Registered. Please login using login tab"); document.location = "http://localhost/answerly/"; ';  //not showing an alert box.
					echo '</script>';
				}

				else
				{
					echo "Failed to insert";
				}
			}
		}
		else
		{
			echo '<script type="text/javascript">';
			echo ' alert("Your Password does not match. Please enter the password again"); document.location = "http://localhost/answerly/"; ';  //not showing an alert box.
			echo '</script>';
			//header('Location: http://localhost/login2/web/');
			#echo "Password not matching!";
		}
	}

} 
	else
	{
		echo "Not entering isset function!";
	}
?>

</body>
</html>