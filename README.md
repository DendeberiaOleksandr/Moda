# Moda Project
This is a web project that contains few modules: 
- moda-resource-server
- ng-client
- client
- admin-client

## moda-resource-server
This is rest API written by Spring Framework. It has endpoints:

| Mapping       | Name          | Description |
| ------------- | ------------- | ------------- |
| GET  | api/{version}/clothes  | Get list of resources |
| GET  | api/{version}/clothes/{id}  | Get resource by id |
| GET  | api/{version}/clothes/size  | Get size of resources |
| POST  | api/{version}/clothes  | Adding resource. Needs request body |
| PATCH  | api/{version}/clothes/{id}  | Updating resource. Needs request body(update resource), ID of resource  |
| DELETE  | api/{version}/clothes  | Delete all resources | 
| DELETE  | api/{version}/clothes/{id}  | Delete resource by id |

The resource looks like Java Object

```java

public class Clothes {
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

```

## admin-client

Client for administrating the system. It's written by `Angular`.

Components:

| Route       | Name          | Description |
| ------------- | ------------- | ------------- |
| clothes/add  | AddClothesComponent  | Post form for adding the resource |
| clothes  | ClothesListComponent  | List of resources |
| clothes/{id}  | ClothesDetailsComponent  | Edit form |
|   | HeaderComponent  | Header for navigating |

### [Header](https://imgur.com/M2BjmBz)
### [AddClothesComponent](https://imgur.com/WtPnpW7)
### [AddClothesComponent 2](https://imgur.com/0o7IKxp)
### [ClothesListComponent](https://imgur.com/JvZaPoZ)
### ![ClothesListComponent](https://i.imgur.com/JvZaPoZ.png)
