## RESTful API Inventory App for Fasteners

A Node/Express web app that uses the Sequelize ORM to interact with a SQLite3 database. Front-end is built with HTML, CSS, JavaScript & EJS.

### Description

A RESTful API for a inventory management application for parts (fasteners).

### Features

-   Create, Read, Update and Delete parts (CRUD)

### Tech Stack

-   Node.js
-   Express
-   Sequelize ORM
-   SQLite3

---

### API Endpoints for Parts

| Method | Endpoint       | Description    |
| ------ | -------------- | -------------- |
| GET    | /api/parts     | Read all parts |
| GET    | /api/parts/:id | Read one part  |
| POST   | /api/parts     | Create a part  |
| PUT    | /api/parts/:id | Update a part  |
| DELETE | /api/parts/:id | Delete a part  |

---

### API Endpoints for Accounts

| Method | Endpoint          | Description       |
| ------ | ----------------- | ----------------- |
| GET    | /api/accounts     | Read all accounts |
| GET    | /api/accounts/:id | Read one account  |
| POST   | /api/accounts     | Create an account |
| PUT    | /api/accounts/:id | Update an account |
| DELETE | /api/accounts/:id | Delete an account |

---

#### Installation

-   git clone `${repo}`
-   Run `npm install`
-   Run `node index.js`
-   Navigate to `${localhost}${port}` in your browser for the front-end app
-   Navigate to `${localhost}${port}/api/parts` in your browser for the API

---

#### Example of API call

`${localhost}/api/parts`

#### Example of API response

```json
[
    {
        "id": 1,
        "partType": "hex",
        "partName": "nuts",
        "quantity": 100,
        "price": 0.08,
        "createdAt": "2023-04-07T20:16:13.575Z",
        "updatedAt": "2023-04-07T20:16:13.575Z"
    },
    {
        "id": 2,
        "partType": "lock",
        "partName": "washers",
        "quantity": 50,
        "price": 0.12,
        "createdAt": "2023-04-07T20:37:26.849Z",
        "updatedAt": "2023-04-07T20:37:26.849Z"
    },
    {
        "id": 3,
        "partType": "wood",
        "partName": "screws",
        "quantity": 60,
        "price": 0.25,
        "createdAt": "2023-04-07T20:37:51.159Z",
        "updatedAt": "2023-04-08T02:15:27.530Z"
    }
]
```

---

#### Things planned to implement in the future (in no particular order)

-   Login/Logout functionality with authentication
-   Search for parts by part type, part name, quantity and price
-   Sort parts by part type, part name, quantity and price
