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
###### When token is missing, return `401`.
```json
{
  "status": 401,
  "message": "This endpoint requires authentication. Please provide a valid token."
}
```

`GET /user?t=a1b2c3d4e5f6_im_a_valid_token`
###### When token is present and valid, return data of the current user.
```json
{
  "status": 200,
  "message": "OK",
  "data": {
    "id": "6f5e4d3c2b1a_im_a_user_id",
    "email": "d4wei@edu.uwaterloo.ca",
    "verified": true,
    "avatar": "picture_of_cute_cat.jpg",
    "name": "Da Wei",
    "initials": "DW",
    "program": "Computer Science",
    "term": "6A",
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

### /auth

### /email_verification

### /match_request
