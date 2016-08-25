package myapp.specification;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.domain.Specifications;

import myapp.model.Application;
import myapp.model.SearchCriteria;

public class ApplicationSpecificationsBuilder {
     
    private final List<SearchCriteria> params;
 
    public ApplicationSpecificationsBuilder() {
        params = new ArrayList<SearchCriteria>();
    }
 
    public ApplicationSpecificationsBuilder with(String key, String operation, Object value) {
        params.add(new SearchCriteria(key, operation, value));
        return this;
    }
 
    public Specification<Application> build() {
        if (params.size() == 0) {
            return null;
        }
 
        List<Specification<Application>> specs = new ArrayList<Specification<Application>>();
        for (SearchCriteria param : params) {
            specs.add(new ApplicationSpecification(param));
        }
 
        Specification<Application> result = specs.get(0);
        for (int i = 1; i < specs.size(); i++) {
            result = Specifications.where(result).and(specs.get(i));
        }
        return result;
    }
}