<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="icon" href="pages/images/favicon.png" />
<title>내 주변</title>
<link rel="stylesheet" href="pages/css/aroundme/aroundme.css" />
<link rel="stylesheet" href="pages/css/frameCss.css" />
<link rel="stylesheet" href="pages/css/aroundme/slider.css" />
<!--  JQuery  -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"
	integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo="
	crossorigin="anonymous"></script>
<!--  JQuery UI  -->
<script src="https://code.jquery.com/ui/1.13.2/jquery-ui.min.js"
	integrity="sha256-lSjKY0/srUM9BE3dPm+c4fBo1dky2v27Gdjm2uoZaL0="
	crossorigin="anonymous"></script>
<!--  카카오 맵 서비스 -->
<!-- services 라이브러리 불러오기 -->
<script type="text/javascript"
	src="//dapi.kakao.com/v2/maps/sdk.js?appkey=5ae67ad4df34ce73bc2c557dd4b55779&libraries=services"></script>

<script src="pages/js/footer.js"></script>
<script src="pages/js/aroundme/addResultContents.js"></script>
<script src="pages/js/aroundme/slider.js"></script>
<script src="pages/js/aroundme/aroundme.js"></script>
<script src="pages/js/aroundme/kakaoMap.js"></script>
</head>
<body>
	<%@include file="gnb.jsp"%>
	<header>
		<div class="container">
			<h1>내 주변</h1>
			<p>
				<span id="myLocation">내 위치:</span>
				<button class="locationBtn">내 위치 설정</button>
			</p>
		</div>
	</header>
	<div class="container">
		<ul class="categoryUl">
			<li data-category="">전체</li>
			<li data-category="pension">펜션</li>
			<li data-category="cafe">카페</li>
			<li data-category="grooming">미용</li>
			<li data-category="hospital">동물병원</li>
			<li data-category="playground">놀이터</li>
			<li data-category="kindergarden">유치원</li>
			<c:if test="${id!=null}">
				<button id="addNewPlaceBtn" onclick=location.assign("newplace");>새
					장소 등록</button>
			</c:if>
		</ul>

		<aside class="sideFilter">
			<form method="get" action="aroundme" name="research">
				<div class="distanceFilter">
					거리
					<div class="sliderContainer"></div>
				</div>
				<div class="starFilter">
					별점
					<div class="sliderContainer"></div>
				</div>
				<div class="reviewFilter">
					리뷰
					<div class="sliderContainer"></div>
				</div>
				<input type="hidden" name="keywords" value="${param.keywords}" /> <input
					type="hidden" name="address" value="${param.address}" /> <input
					type="hidden" name="category" value="${param.category}" /> <input
					type="hidden" name="order" value="${param.order}" /> <input
					type="hidden" name="x" value="${param.x == null ? 0 : param.x}" />
				<input type="hidden" name="y"
					value="${param.y == null ? 0 : param.y}" />
				<button class="submitBtn" type="submit">다시 찾기</button>
			</form>
		</aside>
		<section class="resultContents">
			<ul class="orderByUl">
				<li data-order="distance">거리 순</li>
				<li data-order="star">별점 순</li>
				<li data-order="review">리뷰 순</li>
			</ul>
			<ul class="results">
				<c:forEach var="place" items="${places}">
					<li><a href='detail?no=${place.no}'> <img class="placeImg"
							src="resources/upload/imgs/${place.no}_1.jpg" onerror=this.src="http://placehold.it/180x240">
							<div>
								<p>
									<span class="placeName">${place.title}</span>
									<c:if test="${param.x != null && param.x!=0}">
										<span class="distance">${place.distance}m</span>
									</c:if>
								</p>
								<p>${place.address}${place.detailAddress}</p>
								<p class="star">★ ${place.star}</p>
							</div>
					</a></li>
				</c:forEach>
			</ul>
		</section>
	</div>
</body>
</html>
