package com.MusicManager.repository;

import com.MusicManager.model.Song;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SongRepository extends JpaRepository<Song, Integer> {
    //Page<Song> findAll(Pageable pageable);
    Page<Song> findByNameContaining(String name, Pageable pageable);
}
