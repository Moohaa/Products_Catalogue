package com.example.spring_backennd.data;


import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Collection;

@Entity
@Data
@NoArgsConstructor @AllArgsConstructor @ToString
public class Category  implements Serializable {
    @Id
    @Column(name = "id1", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id1;
    private String category_name ;
    private String description ;

    @OneToMany(mappedBy = "category")
    private Collection<Product> products;

    public Long getId() {
        return id1;
    }

    public void setId(Long id) {
        this.id1 = id;
    }


}
