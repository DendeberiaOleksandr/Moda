package com.moda.resource.persistence.model;

import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.Date;

@Data
public class Clothes {
    @Id
    private String id;
    private String category;
    private String brand;
    private String name;
    private Integer cost;
    private String[] color;
    private String[] size;
    private String photo;
    private String preview;
    private Date published;
}
