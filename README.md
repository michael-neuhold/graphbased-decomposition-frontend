# Graph-based decomposition of monolithic architectures - a path to microservice architectures

## How to start
To start the frontend application a instance of the [backend](https://github.com/michael-neuhold/graphbased-decomposition-backend) needs to run. If this is the case, it is sufficient to
execute the command below. This will generate the API interfaces based on the `Swagger` documentation
and start the react app.
````
npm start
````

## Workflows

### Manage git repositories
![manage git repositories](./_img/git-repositories-min.png)

### Visualize monolithic graph

#### Select coupling strategy to build graph weights
![select monolith coupling strategy](./_img/monolith-dialog-min.png)

#### Monolithic graph
![monolithic graph](./_img/monolith-graph-min.png)

### Visualize microservice suggestions

#### Select coupling strategy as well as settings for decomposition
![select microservice coupling strategy](./_img/microservice-dialog-min.png)

#### Microservice suggestions overview
![microservice cluster](./_img/microservice-graph-min.png)

#### Microservice suggestion detail
![microservice suggestion detail](./_img/microservice-suggestion-detail-min.png)

#### Microservice suggestion with class task guess
![class task guess](./_img/class-task-guess-min.png)

### Manage decompositions
![manage decomositions](./_img/decompositions-min.png)
### Analyze quality metrics
![analyze quality metrics](./_img/quality-metrics-min.png)

### Analyze performance metrics
![analyze performance metrics](./_img/performance-metrics-min.png)