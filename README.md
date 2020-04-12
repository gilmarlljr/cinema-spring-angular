# Cinema

This is a test project made with Java (Spring boot), Angular 9 and MongoBD.

## Get started

### Install dependencies

JDK 11 https://www.oracle.com/java/technologies/javase-jdk11-downloads.html

MongoDB 4.2.5 https://fastdl.mongodb.org/win32/mongodb-win32-x86_64-2012plus-4.2.5-signed.msi

### Clone the repo

```shell
git clone https://github.com/gilmarlljr/printwayy-app
```

### Build Java server

Build server `jar` inside of `cinema-spring-api` :

```shell
.\gradlew assemble
```
### Build Java server

Run server `jar` inside of `cinema-spring-api`:
```shell
java -jar .\build\libs\cinema-spring-api-0.0.1-SNAPSHOT.jar
```

### Build and Run Angular Client

Install the `npm` packages described in the `package.json` inside of `cinema-angular-client`:

```shell
npm install
ng serve --open
```

the client is hosted on `http://localhost:4200`

### Principal routes

`http://localhost:4200/admin` and the project has a default admin user `admin@admin` with password `admin`

`http://localhost:4200/login` and the default client is `client@client` with password `client`

