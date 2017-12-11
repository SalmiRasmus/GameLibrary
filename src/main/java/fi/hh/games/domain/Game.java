package fi.hh.games.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Game {
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	private Long gameid;
	
	private String title;
	private String company;
	private String release;
	private double price;
	private String description;
	
	public Game() {
	
	}

	public Game(Long gameid, String title, String company, String release,
			double price, String description) {
		this.gameid = gameid;
		this.title = title;
		this.company = company;
		this.release = release;
		this.price = price;
		this.description = description;
	}

	public Long getGameid() {
		return gameid;
	}

	public void setGameid(Long gameid) {
		this.gameid = gameid;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getRelease() {
		return release;
	}

	public void setRelease(String release) {
		this.release = release;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public String toString() {
		return "Game [gameid=" + gameid + ", title=" + title + ", company="
				+ company + ", release=" + release + ", price=" + price
				+ ", description=" + description + "]";
	}
	
	
}
