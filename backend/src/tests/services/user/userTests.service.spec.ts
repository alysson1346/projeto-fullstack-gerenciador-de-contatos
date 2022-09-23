import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import app from "../../../app";
import request from "supertest";

let connection: DataSource;

beforeAll(async () => {
  await AppDataSource.initialize()
    .then((res) => (connection = res))
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });
});

afterAll(async () => {
  await connection.destroy();
});

const name = "name";
const email = "email@mail.com";
const phone = "19999999999";
const password = "1234";
const userData = { name, email, phone, password };

describe("Criando novo usuário", () => {
  test("Deve criar um usuário", async () => {
    const response = await request(app).post("/users").send(userData);

    expect(response.status).toBe(201);

    expect(response.body).toEqual(
      expect.objectContaining({
        name,
        email,
        phone,
      })
    );
  });
});

describe("Listando usuários", () => {
  test("Deve retornar uma lista", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map");
  });
});

describe("Logando usuário", () => {
  test("Deve retornar um token", async () => {
    const email = "email@mail.com";
    const password = "1234";
    const userLogin = { email, password };

    const response = await request(app).post("/users/login").send(userLogin);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
  });
});

describe("Listando usuário pelo token", () => {
  test("Deve retornar um token", async () => {
    const userLogin = { email, password };

    const responseLogin = await request(app)
      .post("/users/login")
      .send(userLogin);
    const { token } = responseLogin.body;
    expect(responseLogin.status).toBe(201);
    expect(responseLogin.body).toHaveProperty("token");

    const responseUser = await request(app)
      .get("/users/me")
      .set("Authorization", `Bearer ${token}`);
    expect(responseUser.status).toBe(200);
    expect(responseUser.body).toEqual(
      expect.objectContaining({
        name,
        email,
        phone,
      })
    );
  });
});

describe("Atualizando usuário", () => {
  test("Deve retornar usuário atualizado", async () => {
    const userLogin = { email, password };
    const updateUser = { name: "nameUpdate", phone: "0000" };

    const responseLogin = await request(app)
      .post("/users/login")
      .send(userLogin);
    const { token } = responseLogin.body;
    expect(responseLogin.status).toBe(201);
    expect(responseLogin.body).toHaveProperty("token");

    const responseUser = await request(app)
      .patch("/users/me")
      .send(updateUser)
      .set("Authorization", `Bearer ${token}`);
    expect(responseUser.status).toBe(201);
    expect(responseUser.body).toEqual(
      expect.objectContaining({
        name: "nameUpdate",
        email,
        phone: "0000",
      })
    );
  });
});

describe("Deletando usuário", () => {
  test("Deve deletar usuário", async () => {
    const userLogin = { email, password };
    const updateUser = { name: "nameUpdate", phone: "0000" };

    const responseLogin = await request(app)
      .post("/users/login")
      .send(userLogin);
    const { token } = responseLogin.body;
    expect(responseLogin.status).toBe(201);
    expect(responseLogin.body).toHaveProperty("token");

    const responseUser = await request(app)
      .delete("/users/me")
      .send(updateUser)
      .set("Authorization", `Bearer ${token}`);
    expect(responseUser.status).toBe(204);
    expect(responseUser.body).toEqual(expect.objectContaining({}));
  });
});
