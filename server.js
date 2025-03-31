import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();

app.use(express.json());

const PORT = 3000;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Users API",
      version: "1.0.0",
      description: "A simple Express Users API",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
  },
  apis: ["./server.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`),
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});

let users = [
  {
    id: 1,
    firstName: "Steven",
    lastName: "Spielberg",
  },
  {
    id: 2,
    firstName: "Peter",
    lastName: "Jackson",
  },
  {
    id: 3,
    firstName: "James",
    lastName: "Cameron",
  },
];

/**
 * @swagger
 * /users:
 *  get:
 *    summary: Retrieves a list of all users.
 *    description: Retrieve a list of users.
 *    responses:
 *      200:
 *        description: A list of books.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                   id: 
 *                      type: integer
 *                   firstName: 
 *                      type: string
 *                   lastName:
 *                      type: string
 */

app.get("/users", (req, res) => {
  res.json(users);
});

/**
 * @swagger
 * /users:
 *  post:
 *    summary: Add a new user.
 *    requestBody:
 *      require: true
 *      content: 
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - firstName
 *              - lastName
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *    responses:
 *      200:
 *        description: New user added.
 *        content:
 *          application/json:
 *            schema:
 *               type: object
 *               properties:
 *                  id: 
 *                     type: integer
 *                  firstName: 
 *                     type: string
 *                  lastName:
 *                     type: string
 */

app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };
  users.push(newUser);
  res.json({ message: "New user added", user: newUser });
});

/**
 * @swagger
 * /users/{id}:
 *  put:
 *    summary: Update an existing user.
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric ID for user to update.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *    responses:
 *      200:
 *        description: User updated successfully.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                user:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: integer
 *                    firstName:
 *                      type: string
 *                    lastName:
 *                      type: string
 *      404:
 *        description: User not found.
 */

app.put("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((b) => b.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.firstName = req.body.firstName || user.firstName;
  user.lastName = req.body.lastName || user.lastName;
  res.json({ message: "User successfully updated", user });
});

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *    summary: Delete user
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric ID for user to be deleted.
 *    responses:
 *      200:
 *        description: User has been deleted.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *      404:
 *        description: User not found.
 */

app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  users = users.filter((b) => b.id !== userId);
  res.json({ message: "User has been deleted." });
});
