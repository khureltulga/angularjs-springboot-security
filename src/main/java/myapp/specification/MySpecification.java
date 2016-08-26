package myapp.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import myapp.model.Application;
import myapp.model.SearchCriteria;

public class MySpecification implements Specification {

	private SearchCriteria criteria;
	private String model;
	
	public MySpecification(SearchCriteria criteria, String model) {
		// TODO Auto-generated constructor stub
		this.criteria = criteria;
		this.model = model;
	}

	@Override
	public Predicate toPredicate(Root root, CriteriaQuery query, CriteriaBuilder builder) {
		// TODO Auto-generated method stub
		
		try {
			root = query.from(Class.forName(this.model));
			if (criteria.getOperation().equalsIgnoreCase(">")) {
				return builder.greaterThanOrEqualTo(
						root.<String> get(criteria.getKey()), criteria.getValue().toString());
			} 
			else if (criteria.getOperation().equalsIgnoreCase("<")) {
				return builder.lessThanOrEqualTo(
						root.<String> get(criteria.getKey()), criteria.getValue().toString());
			} 
			else if (criteria.getOperation().equalsIgnoreCase(":")) {
				if (root.get(criteria.getKey()).getJavaType() == String.class) {
					return builder.like(
							root.<String>get(criteria.getKey()), "%" + criteria.getValue() + "%");
				} else {
					return builder.equal(root.get(criteria.getKey()), criteria.getValue());
				}
			}
			return null;
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
}