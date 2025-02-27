package kr.spring.mdcart.service;

import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.spring.mdcart.dao.MdCartMapper;
import kr.spring.mdcart.vo.MdCartVO;


@Service
@Transactional
public class MdCartServiceImpl implements MdCartService{
	
	@Autowired
	private MdCartMapper mdcartMapper;

	@Override
	public void insertCart(MdCartVO cart) {
		mdcartMapper.insertCart(cart);
		
		
	}

	@Override
	public int getTotalByMem_num(int mem_num) {
		return mdcartMapper.getTotalByMem_num(mem_num);
	}

	@Override
	public List<MdCartVO> selectList(int mem_num) {
		return mdcartMapper.selectList(mem_num);
	}

	

	@Override
	public void updateCart(MdCartVO cart) {
		mdcartMapper.updateCart(cart);
		
	}

	@Override
	public void updateCartByMd_num(MdCartVO cart) {
		mdcartMapper.updateCartByMd_num(cart);
		
	}

	@Override
	public void deleteCart(int md_cart_num) {
		mdcartMapper.deleteCart(md_cart_num);
		
	}

	@Override
	public MdCartVO selectCart(int md_num, int mem_num) {
		//Map<String,Object> map = new HashedMap<String, Object>();
		//map.put("md_num", md_num);
		//map.put("mem_num", mem_num);
		return mdcartMapper.selectCart(md_num, mem_num);
	}

}
