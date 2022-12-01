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
GitHub urls can be inserted into the input field. When clicking the `add` button, the repository gets clone 
in the background and appears in the table view. Two functionalities are available show repository in monolithic styled graph or microservice suggestions.
![manage git repositories](./_img/git-repositories-min.png)

### Visualize monolithic graph

#### Select coupling strategy to build graph weights
Coupling strategy can be selected (`semantic coupling`, `contributor coupling` or `logical coupling`).
![select monolith coupling strategy](./_img/monolith-dialog-min.png)

#### Monolithic graph
The following visualization shows example monolithic graph which was generated based on a open source project.
![monolithic graph](./_img/monolith-graph-min.png)

### Visualize microservice suggestions

#### Select coupling strategy as well as settings for decomposition
Coupling strategy can be selected (`semantic coupling`, `contributor coupling` or `logical coupling`).
![select microservice coupling strategy](./_img/microservice-dialog-min.png)

#### Microservice suggestions overview
The following visualization shows an example decomposition of the above shown monolith. 
![microservice cluster](./_img/microservice-graph-min.png)

#### Microservice suggestion detail
A service suggestion in detail. The thickness of edges is connected with the coupling score. 
![microservice suggestion detail](./_img/microservice-suggestion-detail-min.png)

#### Microservice suggestion with class task guess
Guessing the class task by class name (`database access`, `api resource`)
![class task guess](./_img/class-task-guess-min.png)

### Manage decompositions
Already performed decompositions are stored in a database and can be accessed in this view
![manage decomositions](./_img/decompositions-min.png)
### Analyze quality metrics
Performed decomposition can be compared with quality metrics.
![analyze quality metrics](./_img/quality-metrics-min.png)

### Analyze performance metrics
Performed decompositions can be compared by run time.
![analyze performance metrics](./_img/performance-metrics-min.png)