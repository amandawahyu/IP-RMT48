# iProject API Documentation

&nbsp;

## Models :

_User_

```
- username: string, required, unique
- email: string, required, unique
- password: string, required
- imageUrl : string
- phoneNumber : string
- address : string
```

_Favorite_

```
- myManhwaAndMangaId: string,
- title: string,
- coverArt: string,
- description: integer,
- UserId: integer,
```

&nbsp;

## Endpoints :

List of available users endpoints :

-   `POST /users/register`
-   `POST /users/login`
-   `POST /users/google-login`
-   `GET /users`
-   `PATCH /users/:id/imageUrl`

List of available mangas endpoints :

-   `GET /manhwasAndMangas`
-   `GET /favorites`
-   `POST /favorites/:id`
-   `DELETE /favorites/:id`
-   `GET /manhwasAndMangas/:id`


&nbsp;

## 1. POST /users/register

Request:

-   body:

```json
{
    "username": "string",
    "email": "string",
    "password": "string",
    "imageUrl": "string",
    "phoneNumber": "string",
    "address": "string"
}
```

_Response (201 - Created)_

```json
{
    "message": "{email} has been created"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Full Name is required"
}
OR
{
  "message": "email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "email must be unique"
}
OR
{
  "message": "password is required"
}
```

&nbsp;

## 2. POST /login

Request:

-   body:

```json
{
    "email": "string",
    "password": "string"
}
```

_Response (200 - OK)_

```json
{
    "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Email or Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Invalid email or password"
}
```

&nbsp;

## 3. POST /users/google-login

Request:

-   headers:

```json
{
    "google_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "access_token": "string"
}
```

&nbsp;

## 4. GET /users

Request:

-   headers:

```json
{
    "authorization": "Bearer <token>"
}
```

-   params:

```json
{
    "id": "integer"
}
```

_Response (200 - OK)_

```json
{
    "id": 1,
    "email": "abangku@provider.com"
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Data not found"
}
```

&nbsp;

## 5. PATCH /users/:id/imageUrl

Request:

-   headers:

```json
{
    "authorization": "Bearer <token>"
}
```

-   file:

```json
{
    "imageUrl": "<image/*>"
}
```

_Response (201 - Created)_

```json
{
    "message": "Image {email} edited has been updated "
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Unauthenticated"
}
```

&nbsp;

## 6. GET /manhwaandmanga

Request:

-   headers:

```json
{
    "authorization": "Bearer <token>"
}
```

_Response (200 - OK)_

```json
[
    {
        "title": "Solo Leveling",
        "picture_url": "https://cdn.myanimelist.net/images/manga/3/222295.jpg",
        "myanimelist_url": "https://myanimelist.net/manga/121496/Solo_Leveling",
        "myanimelist_id": 121496,
        "type": "Manhwa (? vols)",
    },
    ...
]
```

&nbsp;

## 7. GET /manhwaandmanga/:id

Request:

-   headers:

```json
{
    "authorization": "Bearer <token>"
}
```

-   params:

```json
{
    "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "title_ov": "Wind Breaker",
    "title_en": "",
    "synopsis": "Burdened with expectations since childhood, second-year high schooler Jo \"Jay\" Ja Hyun feels obligated to aim for the top through his studies. Despite obtaining the title of student president at Taeyang High, he continues to study diligently, giving him little time to befriend others. However, possessing an exceptional talent for biking with a technique that astonishes other experienced bikers, there is more to him than meets the eye.\n\r\nOne afternoon, while Jay is skidding his bike at high speed, he catches the interest of his classmate, Yoon Min Woo. Amazed by his unparalleled biking skill, Min Woo is quick to recruit him to his biking crew, but Jay coldly rejects the offer. With a determination to show Jay the fun of riding with others, Min Woo proposes a simple deal—to race against a member of his team, promising to leave him alone if he wins.\n\r\n[Written by MAL Rewrite]",
    "alternative_titles": {
        "japanese": "윈드 브레이커",
        "english": "Wind Breaker"
    },
}
```

_Response (404 - Not Found)_

```json
{
    "data": "no manga found with id {id}"
}
```

_Response (403 - Forbidden)_

```json
{
    "message": "You are not authorized"
}
```

&nbsp;

## 8. GET /manhwaandmanga/favorites

Request:

-   headers:

```json
{
    "authorization": "Bearer <token>"
}
```

_Response (200 - OK)_

```json
[
 {
        "id": 2,
        "myManhwaAndMangaId": 147272,
        "title": "The Greatest Estate Developer",
        "coverArt": "https://cdn.myanimelist.net/images/manga/1/290131.jpg",
        "createdAt": "2024-04-17T06:42:17.638Z",
        "updatedAt": "2024-04-17T06:42:17.638Z"
    },
    ...
]
```

&nbsp;

## 9. POST /mangas/favorites/:Id

Request:

-   headers:

```json
{
    "authorization": "Bearer <token>"
}
```

-   params:

```json
{
    "mangaId": "integer (required)"
}
```

_Response (201 - Created)_

```json
{
    "message": "manga {manga} added to favorite",
    "fav": {
        "id": 3,
        "myManhwaAndMangaId": 145539,
        "title": "Seasons of Blossom",
        "coverArt": "https://cdn.myanimelist.net/images/manga/3/257932.jpg",
        "updatedAt": "2024-04-17T07:18:14.763Z",
        "createdAt": "2024-04-17T07:18:14.763Z"
    }
}
```

&nbsp;

## 10. DELETE /manhwaandmanga/favorites/:Id

Request:

-   headers:

```json
{
    "authorization": "Bearer <token>"
}
```

-   params:

```json
{
    "favId": "integer"
}
```

_Response (200 - OK)_

```json
{
    "message": "{manga title} has been deleted "
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Data not found"
}
```

_Response (403 - Forbidden)_

```json
{
    "message": "`You're not Unauthorized`"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
    "message": "Unauthenticated"
}
```

_Response (500 - Internal Server Error)_

```json
{
    "message": "Internal server error"
}
```
