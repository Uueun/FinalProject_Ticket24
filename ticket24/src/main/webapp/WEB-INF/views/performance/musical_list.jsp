<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>뮤지컬 목록</title>
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/ysw.css">

<!-- css 파일 무시 -->
<script type="text/javascript">
	/* document.querySelector('link[href="${pageContext.request.contextPath}/css/layout.css"]').remove(); */
</script>
<!-- swiper js 시작 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.css"/>
<script src="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.js"></script>
<!-- swiper js 끝 -->
</head>
<body>
<!-- swiper 시작 -->
<div class="out-container">
	<div class="in-container">
		<div class="swiper-container">
			<div class="swiper-slider">
			    <div class="swiper-wrapper">
			        <div class="swiper-slide"><img class="image2" src="http://tkfile.yes24.com/upload2/PerfBlog/202401/20240108/20240108-47819.jpg/dims/quality/70/"></div>
			        <div class="swiper-slide"><img class="image2" src="http://tkfile.yes24.com/upload2/PerfBlog/202401/20240115/20240115-47420.jpg/dims/quality/70/"></div>
			        <div class="swiper-slide"><img class="image2" src="http://tkfile.yes24.com/upload2/PerfBlog/202401/20240117/20240117-48382.jpg/dims/quality/70/"></div>
			        <div class="swiper-slide"><img class="image2" src="http://tkfile.yes24.com/upload2/PerfBlog/202209/20220902/20220902-43386.jpg/dims/quality/70/"></div>
			        <div class="swiper-slide"><img class="image2" src="http://tkfile.yes24.com/upload2/PerfBlog/202402/20240201/20240201-48591.jpg/dims/quality/70/"></div>
			        <div class="swiper-slide"><img class="image2" src="http://tkfile.yes24.com/upload2/PerfBlog/202401/20240129/20240129-47551.jpg/dims/quality/70/"></div>
			    </div>
			    <!-- <div class="swiper-pagination"></div> -->
			    <div class="swiper-button-prev"></div>
			    <div class="swiper-button-next"></div>
			</div>
		</div>
	</div>	
</div>
<!-- swiper 끝 -->

<!-- 콘서트 목록 시작 -->
<div class="list-container">
<!-- 검색 부분 시작 -->
	<form action="list" id="search_form" method="get">
		<div class="search-section">
			<span class="page-title">뮤지컬</span>
		</div>
		
		<div class="search">
			<select name="keyfield" id="keyfield">
				<option value="1" <c:if test="${param.keyfield == 1}">selected</c:if>>공연명</option>
				<option value="2" <c:if test="${param.keyfield == 2}">selected</c:if>>출연진</option>
			</select>
			
  			<input type="text" class="search-bar" name="keyword" id="keyword" value="${param.keyword}" placeholder="검색어 입력">
  			<img class="search-btn" id="search-btn" src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png">
 			
 			<!-- 이미지 클릭하면 submit 이벤트 발생 -->
  			<script>
        		function submitForm() {
           		 document.getElementById("search_form").submit();
       			}

       			// 이미지 클릭 이벤트에 함수 할당
        		document.getElementById("search-btn").addEventListener("click", submitForm);
   			</script>
		</div>
		
	</form>
<!-- 검색 부분 끝 -->
	<div class="list-product">
	<c:if test="${count == 0 }">
	<div>표시할 게시물이 없습니다.</div>
	</c:if>
	<c:if test="${count > 0}">
		<c:forEach var="musical" items="${list}">
			<a style="cusor: pointer;" href="detail?musical_num=${musical.musical_num}">
				<div class="list-product-img">
					<img src="${musical.img_poster}">
					<div class="list-product-txt">
						<p class="v1">${musical.musical_title}</p>
						<p class="v2">${musical.period}</p>
						<p class="v2">${musical.musical_hall}</p>
						<c:if test="${musical.monopoly eq '단독'}">
						<p class="product-monopoly">단독</p>
						</c:if>
					</div>
				</div>
			</a>
		</c:forEach>
	</c:if>
	</div>
<div>${page}</div>

</div>
<!-- 콘서트 목록 끝 -->


<script>
	const swiper = new Swiper('.swiper-slider', {
	    loop: true,                        
	    slidesPerView: 4,				//한 화면에 보여줄 슬라이드 개수
	    centeredSlides : true,
	    spaceBetween: 30,               //페이지 간격
	    autoplay: {                         
	        delay: 2000,  				//다음 슬라이드 넘어가기까지 걸리는 시간
	    },                   
	    pagination: {                       
	    },
	    navigation: {                      
	        nextEl: ".swiper-button-next",
	        prevEl: ".swiper-button-prev",
	    },
	})
</script>
</body>
</html>