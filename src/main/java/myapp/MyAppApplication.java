package myapp;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import myapp.controller.AdminController;

@SpringBootApplication
public class MyAppApplication{

	public static void main(String[] args) {
		SpringApplication.run(MyAppApplication.class, args);
	}
	
	@Bean
	CommandLineRunner init() {
		return (args) -> {
            //FileSystemUtils.deleteRecursively(new File(AdminController.ROOT));
            if (!new File(AdminController.ROOT).exists()){
            	Files.createDirectory(Paths.get(AdminController.ROOT));
            }
		};
	}
}
