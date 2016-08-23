package myapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class AdminController { 
	@RequestMapping(value="/admin",method=RequestMethod.GET)
	public String loadAdmin() {
		return "/admin/index.html";
	}
}
