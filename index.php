<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
	<title></title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="css/common.css">
	<script src="js/jquery-1.11.0.js"></script>	
	<script src="js/robot.js"></script>	
</head>
<body>
<div class='map_area'>	
	<table class='map'>
		<tr>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>		
	</table>
</div>
<div class='code_area'>
	<div>&lt;script&gt;</div>
	<textarea id='code' name='code' class='code'>
	</textarea> 
	<div>&lt;/script&gt;</div>
	<button type=button onclick='run()'> run! </button>
</div>
</body>
</html>
<script>
	function run() {
		jQuery.globalEval($("#code").val());
	}
</script>	