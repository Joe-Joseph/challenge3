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
