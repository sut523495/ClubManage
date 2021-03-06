package project.club.backend.repository;
import project.club.backend.entity.*;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;



public interface ChangwatRepository extends JpaRepository<Changwat, Long> {
    Changwat findById(long id);
Changwat findByChangwat(String id);
}