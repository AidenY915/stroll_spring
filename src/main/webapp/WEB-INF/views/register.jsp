<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원가입</title>
<link rel="icon" href="pages/images/favicon.png" />
<link rel="stylesheet" href="pages/css/frameCss.css" />
<!--  JQuery  -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"
	integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo="
	crossorigin="anonymous"></script>
</head>
<body>
	<%@ include file="gnb.jsp"%>
	<header>
		<div class="container">
			<h1>회원가입</h1>
		</div>
	</header>
	<div class="container">
		<form name="registerForm" method="post" action="registerOK" >
			<table>
				<tr>
					<td>ID</td>
					<td><input type="text" name="id" required></td>
				</tr>
				<tr>
					<td>비밀번호</td>
					<td><input type="password" name="password" required></td>
				</tr>
				<tr>
					<td>비밀번호 확인</td>
					<td><input type="password" name="password2" required></td>
				</tr>
				<tr>
					<td>닉네임</td>
					<td><input type="text" name="nickname" required></td>
				</tr>
				<tr>
					<td>이메일</td>
					<td><input type="email" name="email" required></td>
				</tr>
			</table>
			<button>회원가입</button>
		</form>
	</div>
	<script src = "pages/js/register/register.js"></script>
</body>
</html>