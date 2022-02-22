package com.example.spring_backennd;

import com.example.spring_backennd.dao.CategoryRepository;
import com.example.spring_backennd.dao.ProductRepository;
import com.example.spring_backennd.data.Category;
import com.example.spring_backennd.data.Product;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import java.util.Random;

@SpringBootApplication
public class SpringBackenndApplication implements CommandLineRunner {
    @Autowired
    ProductRepository productRepository;
    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    private RepositoryRestConfiguration repositoryRestConfiguration;

    public static void main(String[] args) {
        SpringApplication.run(SpringBackenndApplication.class, args);
    }


    @Override
    public void run(String... args) throws Exception {

        repositoryRestConfiguration.exposeIdsFor(Product.class,Category.class);

        categoryRepository.save(new Category(null,"computers",null,null));
        categoryRepository.save(new Category(null,"SmartPhone",null,null));
        categoryRepository.save(new Category(null,"Printers",null,null));
        System.out.println(new Category(null,"Printers",null,null));

/*
        Random rnd =new Random();

        categoryRepository.findAll().forEach(category -> {
            for(int i=0;i<10;i++){
                Product p=new Product();
                p.setName(RandomString.make(10));
                p.setAvailable(rnd.nextBoolean());
                p.setCategory(category);
                p.setCurrentPrice(100+rnd.nextInt());
                p.setPromotion(rnd.nextBoolean());
                p.setPhotoName("image10.png");
                p.setSelected(rnd.nextBoolean());

                productRepository.save(p);
            }
        });
*/
    }
}
