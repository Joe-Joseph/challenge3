# EPIC Mail

**EPIC Mail** is Web application that will help people to interact and exchange messages/information over the internet.

**EPIC Mail features**
  1. Users can sign up.
  2. Users can login.
  3. Users can send a message to individuals.
  4. Users can get all received emails.
  5. Users can get sent messages.
  6. Users can get unread messages.
  7. User can read email

**Prerequisites**
  * Node
  * Postman
  
**Setup**
  1. Clone the repository
     ```https://github.com/Joe-Joseph/challenge3.git```
     
  2. Install dependencies
  
     ```npm install```
     
  3. Start the server
  
     ```npm run start```
  
  4. Use Postman to test api on ```localhost:4000```
 
 **Endpoints**
 
 Endpoint | Functionality
 -------- | -------------
 POST /api/v2/auth/signup | Create user account
 POST /api/v2/auth/login | User login
 GET /api/v2/messages | Get received emails
 GET /api/v2/messages/unread | Get unread emails
 GET /api/v2/messages/sent | Get sent emails
 GET /api/v2/messages/:messageId | Read single email
 POST /api/v2/messages | Send email to individual
 
  ### API documentation
 
#### POST http://localhost:4000/api/v2/auth/signup

**Endpoint**

```http://localhost:4000/api/v2/auth/signup```

This endpoints is for creating a new user

**Headers**

```Content-Type	application/json```

**Bodyraw** (application/json)

```
{
	"firstname" : "Vanessa",
	"lastname": "vava",
	"email" : "vava@gmail.com",
	"password": "123456"
}
```

#### POST http://localhost:4000/api/v2/auth/login

**Endpoint**

```http://localhost:4000/api/v2/auth/login```

This Endpoint allow user to login

**Headers**

```Content-Type	application/json```

**Bodyraw** (application/json)
```
{
	"email": "john@gmail.com",
	"password": "123456"
}
```

#### GET http://localhost:4000/api/v2/messages/2

**Enpoint**

```http://localhost:4000/api/v2/messages/2```

This Endpoint is for reading one email

**Headers**

```Content-Type   application/json```

**authorization**

```eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImlhdCI6MTU1MzA1NDU5MywiZXhwIjoxNTUzMTQwOTkzfQ._K2RfAWHbRCcqWcy2fpN45Z8baF4TWGqE1mcUFduGSM```

**Bodyraw** (application/json)

When there is no message you will get the following response
with status code and message telling what happaned
```
{
    "status": 400,
    "message": "There is no sent message"
}
```
When message found
You will get the following response

**Body**
```
{
	"subject":"Greetings",
	"message":"hello!!!",
	"receiverId": 1
}
```

#### GET http://localhost:4000/api/v2/messages

**Endpoint** 

```http://localhost:4000/api/v2/messages```

Get all received emails

**HEADERS**

```Content-Typeapplication/json```

**Authorization**

```eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsImlhdCI6MTU1MzA2MDgzOSwiZXhwIjoxNTUzMTQ3MjM5fQ.4B4JHMz8JlEDNit-Hdoa2WALWO5wLAniZyQDcbgfJf0```

When there is no message you will get the following response

with status code and message telling what happaned
```
{
    "status": 400,
    "message": "sorry there no messages"
}
```
When message found

You will get the following object
```
{
    "status": 200,
    "data":
{
	"subject":"greetings",
	"message":"hello!!!",
	"receiverId":2
}

```

**POST http://localhost:4000/api/v2/messages**

**Endpoint**

```http://localhost:4000/api/v2/messages```

This endpoint sends email

**HEADERS**

```Content-Typeapplication/json```

**authorization**

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsImlhdCI6MTU1MzA2MDgzOSwiZXhwIjoxNTUzMTQ3MjM5fQ.4B4JHMz8JlEDNit-Hdoa2WALWO5wLAniZyQDcbgfJf0
BODY

```
{
	"subject":"Greetings",
	"message":"what's up?",
	"receiverId":12
}

```
