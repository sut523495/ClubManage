package project.club.backend.controller;
import project.club.backend.entity.*;
import project.club.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Collection;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
class ClubController {
    @Autowired private final ClubRepository clubRepository;
    
   ClubController(ClubRepository clubRepository){
        this.clubRepository = clubRepository;
    }

    @GetMapping("/Clubs")
    public Collection<Club> clubs() {
        return clubRepository.findAll().stream()
                .collect(Collectors.toList());
    }

}