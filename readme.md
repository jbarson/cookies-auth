# HTTP Cookies and User Authentication

## Agenda

- [] What is a cookie?
- [] Why Cookies?
- [] Reading & Setting cookies
- [] Render pages with favorite animal
- [] Register / Login user with email and password

### HTTP and Cookies
* **HTTP** is a stateless protocol which means that the participants are not required to remember any previous communication
* **Cookies**:
  * Short for Magic Cookie.
  * Allow us to store information about a user between HTTP requests
  * Stored as key/value pairs in the client's browser
  * Are passed to the server with every HTTP request by the browser.
  * Usually used to store a unique value that identifies a particular user

### Reading Cookies
* Cookies come in with the request
* We could parse the request header ourselves, but it's easier to use a library like `cookie-parser`
* `cookie-parser` will parse the cookies and add them to the `request` object

```js
app.get('/protected', (req, res) => {
  const userId = req.cookies.userId;
  // do something with the userId
});
```

### Setting Cookies
* Cookies are set on the `response` object
* The browser will receive the reponse and store the cookie as directed

```js
app.post('/login', (req, res) => {
  // handle user's input
  res.cookie('userId', user.id); // set the cookie's key and value
  res.redirect('/');
});
```

### Useful Links
* [Restrictions on Cookies](https://flaviocopes.com/cookies/#restrictions-of-cookies)
* [cookie-parser](https://www.npmjs.com/package/cookie-parser)