package myapp.model;

import javax.transaction.Transactional;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public class GlobalDao {
	
	@Autowired
	private SessionFactory _sessionFactory;

	private Session getSession() {
		return _sessionFactory.getCurrentSession();
	}
	
	public Object get(String model, String where_clause){
		if (where_clause.length() > 0){
			return getSession().createQuery("from " + model +" where " + where_clause).list();
		}
		else{
			return getSession().createQuery("from " + model).list();
		}
	}
	
	public Object getById(long id, String model) throws ClassNotFoundException {
		return getSession().load(Class.forName("myapp.model."+model), id);
	}
	
	public void delete(Object obj){
		getSession().delete(obj);
	}
	
	public void update(Object obj){
		getSession().update(obj);
	}
	
	public void save(Object obj) {
		getSession().save(obj);
		return;
	}
}
