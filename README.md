# meetuw

A tool to help you find exactly the person you are looking for within University of Waterloo. A group project for CS493, Fall 2018.

## API Documentation

All request/response payloads, if applicable, should be in `application/json`. Responses always follow the following format:
```json
{
  "status": 200,
  "message": "OK",
  "data": {
    "valuableField": "important_data",
    "someValues": [1, 2, 3, 4, 5]
  }
}
```
```json
{
  "status": 500,
  "message": "Something went wrong :("
}
```

### /user
`GET /user`
##### When token is missing, return `401`.
###### Receive
```json
{
  "status": 401,
  "message": "This endpoint requires authentication. Please provide a valid token."
}
```

`GET /user?t=a1b2c3d4e5f6_im_a_valid_token`
##### When token is present and valid, return data of the current user.
###### Receive
```json
{
  "status": 200,
  "message": "OK",
  "data": {
    "id": "6f5e4d3c2b1a_im_a_user_id",
    "term": "6A",
    "program": "Computer Science",
    "email": "d4wei@edu.uwaterloo.ca",
    "verified": true,
    "name": "Da Wei",
    "initials": "DW",
    "avatar": "picture_of_cute_cat.jpg",
    "extraData": {
      "classesTaken": [
        {
          "term": 1159,
          "subject": "CS",
          "catalog_number": "343"
        },
        {
          "term": 1171,
          "subject": "JAPAN",
          "catalog_number": "301R"
        }
      ]
    }
  }
}
```

`POST /user`
##### Without a token, this creates a new user, and returns an authentication token.
###### Send
```json
{
  "term": "6A",
  "program": "Computer Science"
}
```
###### Receive
```json
{
  "status": 200,
  "message": "OK",
  "data": {
    "authToken": "a1b2c3d4e5f6_im_a_valid_token"
  }
}
```

`POST /user?t=a1b2c3d4e5f6_im_a_valid_token`
##### With a valid token, this updates the current user's data. For example, to update the user's avatar:
###### Send
```json
{
    "avatar": "another_cute_cat_picture.jpg"
}
```
###### Receive
```json
{
  "status": 200,
  "message": "OK",
  "data": {
    "id": "6f5e4d3c2b1a_im_a_user_id",
    "term": "6A",
    "program": "Computer Science",
    "email": "d4wei@edu.uwaterloo.ca",
    "verified": true,
    "name": "Da Wei",
    "initials": "DW",
    "avatar": "another_cute_cat_picture.jpg",
    "extraData": {
      "classesTaken": [
        {
          "term": 1159,
          "subject": "CS",
          "catalog_number": "343"
        },
        {
          "term": 1171,
          "subject": "JAPAN",
          "catalog_number": "301R"
        }
      ]
    }
  }
}
```
##### System managed fields (like `id`, `verified`, `name` and `initials`) cannot be updated (`name` and `initials` are updated automatically by polling UW API when email is verified). `email` cannot be updated once `verified` is `true`. 
###### Send
```json
{
  "id": "i really thought i could hack my user id"
}
```
###### Receive
```json
{
  "status": 400,
  "message": "Field `id` of user cannot be updated."
}
```
##### User's data is updated via an object deep merge. For simplicity, arrays will be replaced.
###### Send
```json
{
  "extraData": {
    "classesTaken": [
      {
        "term": 1159,
        "subject": "CS",
        "catalog_number": "343"
      },
      {
        "term": 1189,
        "subject": "CS",
        "catalog_number": "493"
      }
    ]
  }
}
```
###### Receive
```json
{
  "status": 200,
  "message": "OK",
  "data": {
    "id": "6f5e4d3c2b1a_im_a_user_id",
    "term": "6A",
    "program": "Computer Science",
    "email": "d4wei@edu.uwaterloo.ca",
    "verified": true,
    "name": "Da Wei",
    "initials": "DW",
    "avatar": "another_cute_cat_picture.jpg",
    "extraData": {
      "classesTaken": [
        {
          "term": 1159,
          "subject": "CS",
          "catalog_number": "343"
        },
        {
          "term": 1189,
          "subject": "CS",
          "catalog_number": "493"
        }
      ]
    }
  }
}
```

### /auth

`POST /auth`
##### Without a token, this expects a pair of user email and password. Returns a token if the authentication attempt is successful.
###### Send
```json
{
  "email": "d4wei@edu.uwaterloo.ca",
  "password": "this_is_not_my_password"
}
```
###### Receive
```json
{
  "status": 401,
  "message": "Email and password do not match."
}
```
###### Send
```json
{
  "email": "d4wei@edu.uwaterloo.ca",
  "password": "this_is_my_password"
}
```
###### Receive
```json
{
  "status": 200,
  "message": "OK",
  "data": {
    "authToken": "a1b2c3d4e5f6_im_a_valid_token"
  }
}
```

`POST /auth?t=a1b2c3d4e5f6_im_a_valid_token`
##### With a valid authentication token, this sets/updates the password of the current user. Set `oldPassword` to `null` if the user has never set a password before.
###### Send
```json
{
  "oldPassword": "not_my_old_password",
  "newPassword": "new_password"
}
```
###### Receive
```json
{
  "status": 400,
  "message": "Provided old password is incorrect"
}
```
###### Send
```json
{
  "oldPassword": "old_password",
  "newPassword": "new_password"
}
```
###### Receive
```json
{
  "status": 200,
  "message": "OK"
}
```

`POST /auth/email`
##### Alternative authentication via sending an email to the address associated with an user. Useful when the user has forgotten their password.
###### Send
```json
{
  "email": "d4wei@edu.uwaterloo.ca"
}
```
###### Receive
```json
{
  "status": 200,
  "message": "OK"
}
```
An email will be sent to the user with a link that has an authentication token attached to it.
###### Send
```json
{
  "email": "didnt_actually_register@edu.uwaterloo.ca"
}
```
###### Receive
```json
{
  "status": 200,
  "message": "OK"
}
```
In this case, the user will receive an email to register instead of logging in.
###### Send
```json
{
  "email": "random@gmail.com"
}
```
###### Receive
```json
{
  "status": 400,
  "message": "Invalid email address. Only @edu.uwaterloo.ca addresses can signup."
}
```

### /email_verification

`POST /email_verification`
##### Without a valid authentication token, this endpoint does nothing.
###### Send
```json
{
  "email": "d4wei@edu.uwaterloo.ca"
}
```
###### Receive
```json
{
  "status": 401,
  "message": "This endpoint requires authentication. Please provide a valid token."
}
```

`POST /email_verification?t=a1b2c3d4e5f6_im_a_valid_token`
##### With a valid authentication token and a (seemingly) valid UW email address, the backend will now send an email to it to verify. This email contains a link to `GET /email_verification` with a special token.
###### Send
```json
{
  "email": "d4wei@edu.uwaterloo.ca"
}
```
###### Receive
```json
{
  "status": 200,
  "message": "OK"
}
```

`GET /email_verification?t=a1b2c3d4e5f6_im_a_valid_token`
##### This endpoint does nothing if the current user is already verified.
###### Send
```json
{
  "email": "anything@anywhere.com"
}
```
###### Receive
```json
{
  "status": 400,
  "message": "You have already verified your email address"
}
```

`GET /email_verification`
##### Without a valid email verification token, this endpoint does nothing.
###### Receive
```json
{
  "status": 400,
  "message": "Please provide a valid email verification token"
}
```

`GET /email_verification?evt=1a2b3c4d5e6f_im_a_valid_email_verification_token`
##### With a valid token, this completes the email verification cycle and marks the user as verified. The user's email can no longer be changed from this point on.
###### Receive
```json
{
  "status": 200,
  "message": "OK"
}
```

### /match_request

`POST /match_request`
##### Without a valid authentication token, this endpoint does nothing.
###### Send
```json
{
  "useCase": "academic",
  "criteria": {
    "course": {
      "term": 1189,
      "subject": "CS",
      "catalog_number": "493"
    }
  }
}
```
###### Receive
```json
{
  "status": 401,
  "message": "This endpoint requires authentication. Please provide a valid token."
}
```

`POST /match_request?t=a1b2c3d4e5f6_im_a_valid_token`
##### With a valid authentication token, the backend tries to perform the match as soon as possible.
###### Send
```json
{
  "useCase": "academic",
  "criteria": {
    "course": {
      "term": 1189,
      "subject": "CS",
      "catalog_number": "493"
    }
  },
  "timeOut": 15000
}
```
If the backend was able to find a match within `timeOut`, it includes the match within the response.
###### Receive
```json
{
  "status": 200,
  "message": "OK",
  "data": {
    "name": "Da Wei",
    "initials": "DW",
    "avatar": "picture_of_cute_cat.jpg",
    "program": "Computer Science",
    "email": "d4wei@edu.uwaterloo.ca
  }
}
```
Otherwise, the backend will simply return an OK, meaning that the user will be notified as soon as a match happens.
###### Receive
```json
{
  "status": 200,
  "message": "OK",
  "data": {
    "requestId": "123456abcedf_im_a_match_request"
  }
}
```

`GET /match_request`
##### Without a valid authentication token, this endpoint does nothing.
###### Receive
```json
{
  "status": 401,
  "message": "This endpoint requires authentication. Please provide a valid token."
}
```

`GET /match_request?t=a1b2c3d4e5f6_im_a_valid_token`
##### With a valid authentication token, return list of all outstanding match requests of the current user.
###### Receive
```json
{
  "status": 200,
  "message": "OK",
  "data": {
    "outstandingRequests: [
      {
        "id": "123456abcedf_im_a_match_request",
        "timeCreated": 1542940952,
        "useCase": "academic",
        "criteria": {
          "course": {
            "term": 1189,
            "subject": "CS",
            "catalog_number": "493"
          }
        }
      },
      {
        "id": "654321abcedf_im_another_match_request",
        "timeCreated": 1542940989,
        "useCase": "academic",
        "criteria": {
          "course": {
            "term": 1189,
            "subject": "CS",
            "catalog_number": "343"
          }
        }
      }
    ]
  }
}
```

`GET /match_request?t=a1b2c3d4e5f6_im_a_valid_token&id=123456abcedf_im_a_match_request`
##### With a valid authentication token and a valid request ID, return the match result.
###### Receive
```json
{
  "status": 200,
  "message": "OK",
  "data": {
    "name": "Da Wei",
    "initials": "DW",
    "avatar": "picture_of_cute_cat.jpg",
    "program": "Computer Science",
    "email": "d4wei@edu.uwaterloo.ca
  }
}
```
If the request has not yet been fulfilled:
###### Receive
```json
{
  "status": 400,
  "message": "This request has not yet been fulfilled"
}
```
If the request ID is invalid or if it is valid but doesn't belong to the current user:
###### Receive
```json
{
  "status": 404,
  "message": "Invalid request ID"
}
```
