package com.example.spring_backennd;


import com.example.spring_backennd.data.Product;
import org.springframework.data.rest.core.config.Projection;

@Projection(name ="p1" ,types= Product.class)
public interface ProductProjection {
    public double getCurrentPrice();
}
