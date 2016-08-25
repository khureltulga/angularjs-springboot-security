package myapp.model;

import java.io.Serializable;
import java.lang.reflect.Field;

import javax.persistence.*;


/**
 * The persistent class for the applications database table.
 * 
 */
@Entity
@Table(name="applications")
@NamedQuery(name="Application.findAll", query="SELECT a FROM Application a")
public class Application implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;

	@Column(name="appstore_id")
	private String appstoreId;

	@Override
	public String toString() {
		return "Application [id=" + id + ", appstoreId=" + appstoreId + ", description=" + description + ", image="
				+ image + ", name=" + name + ", playstoreId=" + playstoreId + ", account=" + account + "]";
	}

	@Lob
	private String description;

	private String image;

	private String name;

	@Column(name="playstore_id")
	private String playstoreId;

	//bi-directional many-to-one association to Account
	@ManyToOne
	private Account account;

	public Application() {
	}

	public long getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAppstoreId() {
		return this.appstoreId;
	}

	public void setAppstoreId(String appstoreId) {
		this.appstoreId = appstoreId;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImage() {
		return this.image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPlaystoreId() {
		return this.playstoreId;
	}

	public void setPlaystoreId(String playstoreId) {
		this.playstoreId = playstoreId;
	}

	public Account getAccount() {
		return this.account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}
	
	public void setField(String aFieldName, Object aValue) throws NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException {
		Field aField = getClass().getDeclaredField(aFieldName);
		aField.set(this, aValue);
    }
	
}