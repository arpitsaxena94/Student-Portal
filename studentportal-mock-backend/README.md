# StudentPortal Mock Backend

This is a small mock Express server that mimics the backend expected by the Angular StudentPortal app.
It listens on port **7070** and provides endpoints:

- `POST /login` : expects `{ "userCode": "...", "userPassword": "..." }`
  - Demo users:
    - `admin` / `admin123`
    - `test` / `1234`
  - On success returns:
    ```json
    { "status": 200, "responseInfo": { "userCode": "...", "name": "...", "id": ... } }
    ```
  - On failure returns:
    ```json
    { "status": "404", "message": "User code or password not match" }
    ```

- `GET /studentList` : returns a list of students
- `POST /saveStudent` : accepts student object with `name` and `roll`, returns saved student
- `GET /delete?id=ID` : deletes student by id

## How to run

1. Ensure you have Node.js installed (v16+ recommended).
2. In this folder run:
   ```
   npm install
   npm start
   ```
3. The server will start at `http://localhost:7070`

Use Postman or your Angular app (which already points to `http://localhost:7070/`) to test.

