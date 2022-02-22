package com.example.spring_backennd;


import com.example.spring_backennd.dao.ProductRepository;
import com.example.spring_backennd.data.Product;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Optional;

@CrossOrigin("*")
@RestController
public class MyRestController {



    private ProductRepository productRepository;

    public MyRestController(ProductRepository p){
        productRepository=p;
    }

    @GetMapping(path="/photoProduct/{id}",produces = MediaType.IMAGE_PNG_VALUE)
    public byte[] getPhoto(@PathVariable("id") Long id) throws  Exception{
        Product p=productRepository.findById(id).get();
        return Files.readAllBytes(Paths.get(System.getProperty("user.home")+"/ecom/products/"+p.getId()+".png"));
    }

    @PostMapping(path ="/uploadPhoto/{id}")
    public void uploadPhoto( @RequestBody MultipartFile file, @PathVariable Long id) throws  Exception{
        Product p=productRepository.findById(id).get();
        Files.write(Paths.get(System.getProperty("user.home")+"/ecom/products/"+p.getId()+".png"),file.getBytes());
        productRepository.save(p);
    }

    @PostMapping(path="/uploadProduct")
    public void uploadProduct(@RequestBody Product product){
        Long  n=productRepository.count();
        product.setId(n+1);
        productRepository.save(product);
    }
    @GetMapping(path="/n_products")
    public long n_products(){
        return productRepository.count();
    }

}
