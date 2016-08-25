package myapp.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import myapp.model.Account;
import myapp.model.Application;
import myapp.model.DataSourceResult;
import myapp.model.GlobalDao;
import myapp.model.Role;
import myapp.model.UserRole;
import myapp.repository.AccountRepository;
import myapp.repository.ApplicationRepository;
import myapp.specification.ApplicationSpecification;
import myapp.specification.ApplicationSpecificationsBuilder;

@Controller
public class AdminController {
	@Autowired
	ApplicationRepository ApplicationRepository;

	@Autowired
	AccountRepository AccountRepository;

	@Autowired
	GlobalDao dao;

	public Account checkAuthenticated(){
		String name = SecurityContextHolder.getContext().getAuthentication().getName();
		System.out.println(name + "===");
		if ((!name.equals("anonymousUser")) && (!AccountRepository.findByUsername(name).isEmpty())){
			Account current_user = AccountRepository.findByUsername(name).get(0);
			for (UserRole role : current_user.getUserRoles()){
				if (role.getRole().getName().indexOf("ADMIN") > 0){
					return current_user;
				}
			}
			return null;
		}
		else{
			return null;
		}
	}

	@RequestMapping(value="/admin",method=RequestMethod.GET)
	public String loadAdmin() {
		return "/admin/index.html";
	}

	@ResponseBody
	@RequestMapping(value="/api/applications",method=RequestMethod.GET)
	public Object loadApps(@RequestParam(value = "search", required = false) String search, Pageable pageable) {
		DataSourceResult datas = new DataSourceResult();
		ApplicationSpecificationsBuilder builder = new ApplicationSpecificationsBuilder();
		
		if (search != null) {
            final Pattern pattern = Pattern.compile("(\\w+?)(:|<|>)(\\w+?),");
            final Matcher matcher = pattern.matcher(search + ",");
            while (matcher.find()) {
            	System.out.println(matcher.group(1) + matcher.group(2) + matcher.group(3));
                builder.with(matcher.group(1), matcher.group(2), matcher.group(3));
            }
        }
		
		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
		Page apps = ApplicationRepository.findAll(builder.build(),pageable);
		for(Object a : apps.getContent()){
			Map<String,Object> temp=new HashMap<String, Object>(); 
			Application app = (Application) a;
			temp.put("id", app.getId());
			temp.put("name", app.getName());
			temp.put("description", app.getDescription());
			temp.put("image", app.getImage());
			temp.put("playstoreId", app.getPlaystoreId());
			temp.put("appstoreId", app.getAppstoreId());
			result.add(temp);
		}
		datas.setData(result);
		datas.setTotal(ApplicationRepository.count());
		return datas;
	}

	/*@RequestMapping(method = RequestMethod.GET, value = "/api/applications")
	@ResponseBody
	public Iterable<Application> search(@RequestParam(value = "search", required = false) String search,
			@PageableDefault(sort = { "name" }, value = 2) Pageable pageable) {
		//ApplicationPredicatesBuilder builder = new ApplicationPredicatesBuilder();

        if (search != null) {
            final Pattern pattern = Pattern.compile("(\\w+?)(:|<|>)(\\w+?),");
            final Matcher matcher = pattern.matcher(search + ",");
            while (matcher.find()) {
            	System.out.println(matcher.group(1) + matcher.group(2) + matcher.group(3));
                //builder.with(matcher.group(1), matcher.group(2), matcher.group(3));
            }
        }
        //BooleanExpression exp = builder.build();
        System.out.println(search);
		return null;
	}*/

	@ResponseBody
	@RequestMapping(value="/api/applications",method=RequestMethod.POST)
	public Object createApps(@RequestBody String jsonString) throws ClassNotFoundException {
		Account user = checkAuthenticated();
		if (user != null){
			Class<?> classtoConvert;
			JSONObject obj = new JSONObject(jsonString);
			classtoConvert=Class.forName("myapp.model.Application");
			Gson gson = new Gson();
			Application object = (Application)gson.fromJson(obj.toString(),classtoConvert);
			object.setAccount(user);
			ApplicationRepository.save(object);
			return object;
		}
		else{
			return null;
		}

	}

	@ResponseBody
	@RequestMapping(value="/api/applications",method=RequestMethod.PUT)
	public Object updateApps(@RequestBody String jsonString) throws ClassNotFoundException {
		Account user = checkAuthenticated();
		if (user != null){
			Class<?> classtoConvert;
			JSONObject obj = new JSONObject(jsonString);
			classtoConvert=Class.forName("myapp.model.Application");
			Gson gson = new Gson();
			Application object = (Application)gson.fromJson(obj.toString(),classtoConvert);
			if (!ApplicationRepository.findOne(object.getId()).equals(null)){
				object.setAccount(ApplicationRepository.findOne(object.getId()).getAccount());
			}

			dao.update(object);
			return object;
		}
		else{
			return null;
		}

	}

	@ResponseBody
	@RequestMapping(value="/api/applications",method=RequestMethod.DELETE)
	public HttpStatus deleteApps(@RequestBody String jsonString) throws ClassNotFoundException {
		Account user = checkAuthenticated();
		if (user != null){
			Class<?> classtoConvert;
			JSONObject obj = new JSONObject(jsonString);
			classtoConvert=Class.forName("myapp.model.Application");
			Gson gson = new Gson();
			Application object = (Application)gson.fromJson(obj.toString(),classtoConvert);
			ApplicationRepository.delete(object);
			return HttpStatus.OK;
		}
		else{
			return HttpStatus.BAD_REQUEST;
		}

	}
}
