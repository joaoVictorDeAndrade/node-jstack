let users = require("../mocks/users");

module.exports = {
  listUsers(request, response) {
    const { order } = request.query;

    const sortedUsers = users.sort((a, b) => {
      if (order === "desc") return a.id < b.id ? 1 : -1;

      return a.id > b.id ? 1 : -1;
    });

    response.send(200, sortedUsers);
  },

  getUserById(request, response) {
    const { id } = request.params;

    const user = users.find((user) => user.id === Number(id));

    if (!user) {
      response.send(400, { error: "User not found" });
    }

    response.send(200, user);
  },

  createUser(request, response) {
    const { body } = request;

    if (!body.name) {
      response.send(400, { error: "Invalid request" });
      return;
    }

    const lastUserId = users[users.length - 1].id;

    const newUser = {
      id: lastUserId + 1,
      name: body.name,
    };

    users.push(newUser);

    response.send(200, newUser);
  },

  updateUser(request, response) {
    let { id } = request.params;
    const { name } = request.body;

    id = Number(id);

    const userExists = users.find((user) => user.id === id);

    if (!userExists) return response.send(400, { error: "User not found" });

    userExists.name = name;

    response.send(200, userExists);
  },

  deleteUser(request, response) {
    let { id } = request.params;

    id = Number(id);

    const userExists = users.find((user) => user.id === id);

    if (!userExists) return response.send(400, { error: "User not found" });

    users = users.filter((user) => user.id !== id);

    response.send(200, { deleted: true });
  },
};
