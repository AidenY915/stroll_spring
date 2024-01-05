package com.stroll.www.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.stroll.www.vo.PlaceVO;

@Controller
public class PlaceController {
	@Autowired
	private PlaceService service;
	
	@RequestMapping("/aroundme")
	public String showAroundme(@RequestParam(name = "keywords", defaultValue = "", required = false) String keywords, Model model) {
		model.addAttribute("places", service.getPlaceList(keywords));
		return "aroundme";
	}
	
	@RequestMapping("/detail")
	public String showDetail(PlaceVO vo, Model model){
		model.addAttribute("place", service.getPlace(vo));
		return "detail";
	}
}
