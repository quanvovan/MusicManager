package com.MusicManager.service;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.Path;

@Service
public class FileStorageService {
    private final Path root = Paths.get("src/main/resources/static/uploads/music");

    public String save(MultipartFile file) {

        // Tạo thư mục gốc upload nếu nó không tồn tại.
        if (!Files.exists(root)) {
            try {
                Files.createDirectory(root);
            } catch (IOException e) {
                throw new RuntimeException("Could not initialize folder for upload!");
            }
        }

        String fileName = file.getOriginalFilename();
        if (fileName != null && fileName.length() > 0) {
            try {
                Files.copy(file.getInputStream(), this.root.resolve(fileName));
                return "uploads/music/" + fileName;
            } catch (Exception e) {
                //throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
                return null;
            }
        }
        return null;
    }

    public Resource load(String filename) {
        try {
            Path file = root.resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    public void delete(String path){
        try{
            Files.delete( Paths.get("src/main/resources/static/").resolve(path));
        }catch (Exception e){
            throw  new RuntimeException("Can not delete file!");
        }
    }
}
