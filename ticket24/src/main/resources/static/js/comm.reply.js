$(function(){
	let rowCount = 10;
	let currentPage;
	let count;
	
	/*----------------------------------------
	* 댓글 목록
	*----------------------------------------*/
	//댓글 목록
	function selectList(pageNum){
		currentPage = pageNum;
		//로딩 이미지 노출
		$('#loading').show();
		
		$.ajax({
			url:'listReply',
			type:'post',
			data:{pageNum:pageNum,rowCount:rowCount,comm_num:$('#comm_num').val()},
			dataType:'json',
			success:function(param){
				$('#loading').hide();
				count = param.count;
				
				if(pageNum == 1){
					//처음 호출시는 해당 ID의 div의 내부 내용물을 제거
				$('#output').empty();
				}
				
				//댓글 수 읽어오기
				displayReplyCount(param);
				
				//댓글 목록 작업
				$(param.list).each(function(index,item){
					let output = '<div class="item">';
					output += '<ul class="detail-info>';
					output += '<li>';
					output += '<img src="../member/viewProfile?mem_num='+item.mem_num+'" width="40" height="40" class="my-photo">';
					output += '</li>';
					output += '<li>';
					
					if(item.mem_nickname){
						output += item.mem_nickname + '<br>';
					}else{
						output += item.mem_id + '<br>';
					}
					
					if(item.comm_remodifydate){
						output += '<span class = "modify-date">최근 수정일 : ' + item.comm_remodifydate + '</span>';
					}else{
						output += '<span class = "modify-date">등록일 : ' + item.comm_redate + '</span>';
					}
					
					output += '</li>';
					output += '</ul>';
					output += '<div class="sub-item">';
					output += '<p>' + item.comm_recontent.replace(/\r\n/g,'<br>') + '</p>';
					
					if(param.user_num==item.mem_num){
						//로그인한 회원번호와 댓글 작성자 회원번호가 같으면
						output += ' <input type="button" data-num="'+item.comm_renum+'" value ="수정" class="modify-btn">';
						output += ' <input type="button" data-num="'+item.comm_renum+'" value ="삭제" class="delete-btn">';
					}
					
					output += '<hr size="1" noshade>';
					output += '</div>';
					output += '</div>';
					
					//문서 객체에 추가
					$('#output').append(output);
					
				});
				
				//페이징 버튼 처리
				if(currentPage>=Math.ceil(count/rowCount)){
					//다음 페이지가 없음
					$('.paging-button').hide();
				}else{
					//다음 페이지가 존재
					$('.paging-button').show();
				}
			},
			error:function(){
				//로딩 이미지 감추기
				$('#loading').hide();
				alert('네트워크 오류 발생');
			}
		});
	}
	//다음 댓글 보기 버튼 클릭 시 데이터 추가
	$('.paging-button input').click(function(){
		selectList(currentPage + 1);
	});
	/*----------------------------------------
	* 댓글 등록
	*----------------------------------------*/
	//댓글 등록
	$('#re_form').submit(function(event){
		if($('#comm_recontent').val().trim()==''){
			alert('내용을 입력하세요');
			$('#comm_recontent').val('').focus();
			return false;
		}
		
		let form_data = $(this).serialize();
		//서버와 통신
		$.ajax({
			url:'writeReply',
			type:'post',
			data:form_data,
			dataType:'json',
			success:function(param){
				if(param.result == 'logout'){
					alert('로그인해야 작성할 수 있습니다.');
				}else if(param.result =='success'){
					//폼 초기화
					initForm();
					//댓글 작성이 성공하면 새로 삽입한 글을 포함해서 첫번째 페이지의 게시글들을 다시 호출
					selectList(1);
				}
			},
			error:function(){
				alert('네트워크 오류 발생');
			}
		});
		//기본 이벤트 제거
		event.preventDefault();
	});
	//댓글 작성 폼 초기화
	function initForm(){
		$('textarea').val('');
		$('#re_first.letter-count').text('300/300');
	}
	/*----------------------------------------
	* 댓글 등록
	*----------------------------------------*/
	//댓글 수정 버튼 클릭 시 수정폼 노출
	$(document).on('click','.modify-btn',function(){
		//댓글 번호
		let comm_renum = $(this).attr('data-num');
		//댓글 내용
		let comm_recontent = $(this).parent().find('p').html().replace(/<br>/gi, '\r\n');
		
		//댓글 수정폼 UI
		let modifyUI = '<form id="mre_form">';
			modifyUI += '<input type ="hidden" name="comm_renum" id="mre_num" value="'+comm_renum+'">';
			modifyUI += '<textarea rows="3" cols="50" name="comm_recontent" id="mre_content" class="rep-content">'+comm_recontent+'</textarea>';
			modifyUI += '<div id="mre_first"><span class="letter-count">300/300</span></div>';
			modifyUI += '<div id ="mre_second" class="align-right">';
			modifyUI += ' <input type="submit" value="수정">';
			modifyUI += ' <input type="button" value="취소" class="re-reset">';
			modifyUI += '</div>';
			modifyUI += '<hr size="1" noshade width="96%">';
			modifyUI += '</form>';
			
			//이전에 이미 수정하는 댓글이 있을 경우 수정 버튼을 클릭하면
			//숨김 sub-item을 환원시키고 수정폼을 초기화
			initModifyForm();
			//지금 클릭해서 수정하고자 하는 데이터는 감추기
			//수정 버튼을 감싸고 있는 div 감추기
			$(this).parent().hide();
			
			//수정폼을 수정하고자 하는 데이터가 있는 div에 노출
			$(this).parents('.item').append(modifyUI);
			
			//입력한 글자수 셋팅
			let inputLength = $('#mre_content').val().length;
			let remain = 300 - inputLength;
			remain += '/300';
			
			//문서 객채에 반영
			$('#mre_first .letter-count').text(remain);
	});
	//수정폼에서 취소 버튼 클릭 시 수정폼 초기화
	$(document).on('click','.re-reset',function(){
		initModifyForm();
	});
	//댓글 수정폼 초기화 
	function initModifyForm(){
		$('.sub-item').show();
		$('#mre_form').remove();
	}
	//댓글 수정
	$(document).on('submit','#mre_form',function(event){
		if($('#mre_content').val().trim()==''){
			alert('내용을 입력하세요');
			$('#mre_content').val('').focus();
			return false;
		}
		//폼에 입력한 데이터 반환
		let form_data = $(this).serialize();
		
		//서버와 통신
		$.ajax({
			url:'updateReply',
			type:'post',
			data:form_data,
			dataType:'json',
			success:function(param){
				if(param.result=='logout'){
					alert('로그인해야 수정할 수 있습니다.');
				}else if(param.result=='success'){
					//내용 읽기
					$('#mre_form').parent().find('p').html($('#mre_content').val().replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\r\n/g,'<br>').replace(/\r/g,'<br>').replace(/\n/g,'<br>'));
					//최근 수정일 처리
					$('#mre_form').parent().find('.modify-date').text('최근 수정일 : 5초미만');
					//수정폼 초기화
					initModifyForm();
				}else if(param.result=='wrongAccess'){
					alert('타인의 글은 수정할 수 없습니다.');
				}else{
					alert('댓글 수정 오류');
				}
			},
			error:function(){
				alert('네트워크 오류 발생');
			}
		});
		
		//기본이벤트 제거
		event.preventDefault();
	});
	/*----------------------------------------
	* 댓글 등록, 수정 공통
	*----------------------------------------*/
	//textarea에 내용 입력시 글자수 체크
	$(document).on('keyup','textarea',function(){
		//입력한 글자수 구하기
		let inputLength = $(this).val().length;
		
		if(inputLength>300){//300자를 넘어선 경우
			$(this).val($(this).val().substring(0,300));
		}else{//300자 이하인 경우
			//남은 글자수 구하기
			let remain = 300 - inputLength;
			remain += '/300';
			if($(this).attr('id')=='comm_recontent'){
				//등록폼 글자수
				$('#re_first .letter-count').text(remain);
			}else if($(this).attr('id')=='mre_content'){
				//수정폼 글자수
				$('#mre_first .letter-count').text(remain);
			}
		}
	});
	/*----------------------------------------
	* 댓글 삭제
	*----------------------------------------*/
	$(document).on('click','.delete-btn',function(){
		//댓글번호
		let comm_renum = $(this).attr('data-num');
		
		//서버와 통신
		$.ajax({
			url:'deleteReply',
			type:'post',
			data:{comm_renum:comm_renum},
			datatype:'json',
			success:function(param){
				if(param.result=='logout'){
					alert('로그인해야 삭제할 수 있습니다.');
				}else if(param.result=='success'){
					alert('삭제 완료!');
					selectList(1);
				}else if(param.result=='wrongAccess'){
					alert('타인의 글을 삭제할 수 없습니다.');
				}else{
					alert('댓글 삭제 오류 발생');
				}
			},
			error:function(){
				alert('네트워크 오류 발생!');
			}
		});
		
	});
	/*----------------------------------------
	* 댓글수 표시
	*----------------------------------------*/
	function displayReplyCount(param){
		let count = param.count;
		let output;
		if(count>0){
			output = '댓글수('+count+')';		
		}else{
			output = '댓글수(0)';
		}
		//문서 객체의 추가
		$('#output_rcount').text(output);
	}
	/*----------------------------------------
	* 초기 데이터(목록) 호출
	*----------------------------------------*/
	selectList(1);
});