package com.stroll.www.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.stroll.www.vo.UserVO;

@Controller
public class UserController {
	@Autowired
	private UserService service;
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public String login(UserVO vo,@RequestParam("path") String path, HttpServletRequest request) {
		String id = service.login(vo);
		if(id != null) {
			HttpSession session = request.getSession(); 
			session.setAttribute("id", id);
			session.setMaxInactiveInterval(60*20);
		}
		System.out.println("id : " + id);
		System.out.println(path);
		return "redirect:" + path.replace("/stroll", "");
	}
	@RequestMapping(value = "/logout")
	public String logout(HttpServletRequest request) {
		request.getSession().invalidate();
		return "redirect:/";
	}
}
