package myapp.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.security.Principal;

import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

@Controller
public class MainController {
	@RequestMapping("/user")
	@ResponseBody
	public Principal user(Principal user) {
		return user;
	}
	
	@RequestMapping(value="/",method=RequestMethod.GET)
	public String index() {
		return "/home/index.html";
	}
	
	@ResponseBody
	@RequestMapping(value="/api/get_configs",method=RequestMethod.GET)
	public String getConfigs() throws IOException {
		File f = new File("src/main/resources/static/config.json");
        if (f.exists()){
            InputStream is = new FileInputStream("src/main/resources/static/config.json");
            BufferedReader br = new BufferedReader(new InputStreamReader(is));
            //String jsonTxt = IOUtils.toString(is);
            String jsonTxt = "";
            String line;
			while ((line = br.readLine()) != null) {
            	jsonTxt = jsonTxt + line;
               
         	  }
            br.close();
            JSONObject json = new JSONObject(jsonTxt); 
            return json.toString();
        }
        else{
        	return null;
        }
	}
	
}
