package fi.hh.games;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import fi.hh.games.domain.User;
import fi.hh.games.domain.UserRepository;
import fi.hh.games.domain.Game;
import fi.hh.games.domain.GameRepository;

@SpringBootApplication
public class GamesApplication {

	public static void main(String[] args) {
		SpringApplication.run(GamesApplication.class, args);
	}
	
    @Bean
    public CommandLineRunner startEntry(GameRepository repository, UserRepository userepository) {
        return (args) -> {

        	User user1 = new User("user",
                    "$2a$06$3jYRJrg0ghaaypjZ/.g4SethoeA51ph3UD4kZi9oPkeMTpjKU5uo6", "USER");
            User user2 = new User("admin",
                    "$2a$10$0MMwY.IQqpsVc1jC8u7IJ.2rT8b0Cd3b3sfIBGV2zfgnPGtT4r0.C", "ADMIN");
            userepository.save(user1);
            userepository.save(user2);

            repository.save(new Game(null, "Halo", "Bungie", "15-11-2001", 60.00, "FPS"));
            repository.save(new Game(null, "Starcraft", "Blizzard", "31-03-1998", 60.00, "RTS"));
        };
    }
}
