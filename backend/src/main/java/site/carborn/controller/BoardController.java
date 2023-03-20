package site.carborn.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import site.carborn.util.network.NormalResponse;

@RestController
@CrossOrigin(origins = "*")
public class BoardController {
    @GetMapping("/api/board/list/{page}")
    public ResponseEntity<?> test(@PathVariable int page) {
        return NormalResponse.toResponseEntity(HttpStatus.OK, null);
    }
}
