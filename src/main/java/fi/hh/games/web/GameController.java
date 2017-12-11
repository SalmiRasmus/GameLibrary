package fi.hh.games.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class GameController {

	@RequestMapping(value = "/index")
    public String indexSecure() {
        return "index";
    }
}
