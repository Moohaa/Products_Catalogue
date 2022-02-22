package com.example.spring_backennd.data;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor@AllArgsConstructor@ToString
public class Product  implements Serializable {
     @Id
     @Column(name = "product_id", nullable = false)
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long product_id;

    private String name;
    private String description ;
    private double currentPrice;
    private boolean promotion;
    private boolean selected;
    private  boolean available ;
    private String photoName;
    @ManyToOne
    private Category category;

    public Long getId() {
     return product_id;
    }

    public void setId(Long id) {
       this.product_id = id;
    }
}
