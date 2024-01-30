package kr.spring.concert.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.spring.concert.vo.ConcertDetailVO;
import kr.spring.concert.vo.ConcertVO;

@Mapper
public interface ConcertMapper {
	//콘서트 

	public int selectRowCount(Map<String,Object> map);
	public List<ConcertVO> selectList(Map<String,Object> map);
	public ConcertDetailVO selectConcert(int concert_num);
	
	//--------------웹 스크롤 -----------------

	//콘서트 리스트 읽어오기
	public void insertConcert(ConcertVO concert);

	//콘서트 상세 페이지 읽어오기
	public void insertConcertDetail(ConcertDetailVO concertdetail);
}
