package com.MusicManager.service;

import com.MusicManager.model.Song;
import com.MusicManager.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.MusicManager.service.ServiceResult.Status;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Service
public class SongService {
    @Autowired
    private SongRepository songRepository;

    @Autowired
    private FileStorageService fileStorageService;

    //Get all list songs
    public ServiceResult getAllSong(String name, int page, int size){
        ServiceResult result = new ServiceResult();
        Pageable paging = PageRequest.of(page, size);

        Page<Song> pageSongs;
        try {
            if (name == null) {
                pageSongs = songRepository.findAll(paging);
            }
            else {
                pageSongs = songRepository.findByNameContaining(name, paging);
            }
            //Set data
            result.setData(pageSongs.getContent());

            //Set paging
            result.setCurrentPage(pageSongs.getNumber());
            result.setTotalItems(pageSongs.getTotalElements());
            result.setTotalPages(pageSongs.getTotalPages());

            //Set message and status
            result.setStatus(Status.success);
            result.setMessage("Get data success !");
        } catch (Exception e) {
            result.setStatus(Status.error);
            result.setMessage("Have an error when get data !");
        }

        return result;
    }

    //Get song by _id
    public ServiceResult getSongById(Integer id) {
        ServiceResult result = new ServiceResult();
        Song song = songRepository.findById(id).orElse(null);
        result.setData(song);

        //Resource file = fileStorageService.load(song.getPath());

        return result;
    }

    //Save a song
    public ServiceResult createSong(Song song, MultipartFile file){
        ServiceResult result = new ServiceResult();

        String path = fileStorageService.save(file);

        if(path != null) {
            song.setPath(path);
            result.setData(songRepository.save(song));
            result.setMessage("Add a new song success !");
        }else{
            result.setStatus(Status.error);
            result.setMessage("Have an error when uploading the file !");
        }
        return result;
    }

    //Update a song
    public ServiceResult updateSong(Integer id, Song song){
        ServiceResult result = new ServiceResult();

        if(!songRepository.findById(id).isPresent()){
            result.setStatus(Status.error);
            result.setMessage("Song not found!");
        }else{
            song.setId(id);
            result.setData(songRepository.save(song));
            result.setMessage("Update song success !");
        }

        return result;
    }

    //Delete a song
    public ServiceResult deleteSong(Integer id){

        ServiceResult result = new ServiceResult();
        Song song = songRepository.findById(id).orElse(null);

        if(song == null){
            result.setStatus(Status.error);
            result.setMessage("Song not found");
        }else{
            fileStorageService.delete(song.getPath());
            songRepository.delete(song);
            result.setMessage("Deleted song success!");
        }

        return result;
    }
    
    //Delete many song
    public ServiceResult deleteManySong(ArrayList<String> arrayID){
        ServiceResult result = new ServiceResult();
        /*for (String s : arrayID) {
            System.out.println(s);
        }*/
        arrayID.forEach((id) -> {

            //System.out.println(Integer.parseInt(id));
            Song song = songRepository.findById(Integer.parseInt(id)).orElse(null);
            System.out.println(song);
            if(song == null){
                result.setStatus(Status.error);
                result.setMessage("Song not found !!!");
            }else{
                fileStorageService.delete(song.getPath());
                songRepository.delete(song);
                result.setMessage("Deleted select songs success!");
            }
        });
        return result;
    }

}
