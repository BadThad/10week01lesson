import express from "express";

const app = express();

app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
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

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };
  users.push(newUser);
  res.json({ message: "New user added", user: newUser });
});

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
