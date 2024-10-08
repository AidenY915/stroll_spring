package com.stroll.www.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PageController {
	
	@RequestMapping(value={"/main", "/"})
	public String showMain() {
		return "main";
	}
	
	@RequestMapping("/moreInfo")
	public String showMoreInfo() {
		return "moreInfo";	
	}
	@RequestMapping("/gnb")
	public String showGnb() {
		return "gnb";	
	}
	@RequestMapping("/newplace")
	public String showNewPlace() {
		return "newPlace";
	}
	@RequestMapping("/register")
	public String showRegisterPage() {
		return "register";
	}
}
