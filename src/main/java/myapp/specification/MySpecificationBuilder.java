package myapp.specification;


import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.domain.Specifications;

import myapp.model.Application;
import myapp.model.SearchCriteria;

public class MySpecificationBuilder {
     
    private final List<SearchCriteria> params;
    private String model;
 
    public MySpecificationBuilder() {
        params = new ArrayList<SearchCriteria>();
    }
    public MySpecificationBuilder(String model) {
        params = new ArrayList<SearchCriteria>();
        this.model = model;
    }
 
    public MySpecificationBuilder with(String key, String operation, Object value) {
        params.add(new SearchCriteria(key, operation, value));
        return this;
    }
 
    public Specification<?> build() {
        if (params.size() == 0) {
            return null;
        }
 
        List<Specification<?>> specs = new ArrayList<Specification<?>>();
        for (SearchCriteria param : params) {
            specs.add(new MySpecification(param, this.model));
        }
        Specification<?> result = specs.get(0);
        for (int i = 1; i < specs.size(); i++) {
        	//Specification<?> next = specs.get(i);
            result = Specifications.where(result);
        }
        return result;
    }
}