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
