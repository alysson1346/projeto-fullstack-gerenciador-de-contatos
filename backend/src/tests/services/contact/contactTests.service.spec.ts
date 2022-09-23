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

const contact = { name: "mae", email: "mae@email.com", phone: "9923456" };

describe("Criando novo contato", () => {
  test("Deve criar um novo contato", async () => {
    const response = await request(app).post("/users").send(userData);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        name,
        email,
        phone,
      })
    );

    const userLogin = { email, password };
    const responseLogin = await request(app)
      .post("/users/login")
      .send(userLogin);
    const { token } = responseLogin.body;
    expect(responseLogin.status).toBe(201);
    expect(responseLogin.body).toHaveProperty("token");

    const responseContact = await request(app)
      .post("/contact")
      .send(contact)
      .set("Authorization", `Bearer ${token}`);
    expect(responseContact.status).toBe(201);
    expect(responseContact.body).toEqual(expect.objectContaining(contact));
  });
});

describe("Listando Contato", () => {
  test("Deve retornar uma lista", async () => {
    const userLogin = { email, password };
    const responseLogin = await request(app)
      .post("/users/login")
      .send(userLogin);
    const { token } = responseLogin.body;
    expect(responseLogin.status).toBe(201);
    expect(responseLogin.body).toHaveProperty("token");

    const responseContact = await request(app)
      .post(`/contact`)
      .send(contact)
      .set("Authorization", `Bearer ${token}`);
    expect(responseContact.status).toBe(201);
    expect(responseContact.body).toEqual(expect.objectContaining(contact));

    const responseContactID = await request(app)
      .post(`/contact/${responseContact.body.id}`)
      .send(contact)
      .set("Authorization", `Bearer ${token}`);
    expect(responseContact.status).toBe(201);
    expect(responseContact.body).toEqual(expect.objectContaining(contact));
  });
});

describe("Atualizando Contato", () => {
  test("Deve retornar uma lista", async () => {
    const userLogin = { email, password };
    const responseLogin = await request(app)
      .post("/users/login")
      .send(userLogin);
    const { token } = responseLogin.body;
    expect(responseLogin.status).toBe(201);
    expect(responseLogin.body).toHaveProperty("token");

    const responseContact = await request(app)
      .post(`/contact`)
      .send(contact)
      .set("Authorization", `Bearer ${token}`);
    expect(responseContact.status).toBe(201);
    expect(responseContact.body).toEqual(expect.objectContaining(contact));

    const updateObj = { name: "pai" };

    const responseContactID = await request(app)
      .patch(`/contact/${responseContact.body.id}`)
      .send(updateObj)
      .set("Authorization", `Bearer ${token}`);
    expect(responseContactID.status).toBe(200);
    expect(responseContactID.body).toEqual(
      expect.objectContaining({
        name: "pai",
        email: "mae@email.com",
        phone: "9923456",
      })
    );
  });
});

describe("Deletando Contato", () => {
  test("Deve retornar uma lista", async () => {
    const userLogin = { email, password };
    const responseLogin = await request(app)
      .post("/users/login")
      .send(userLogin);
    const { token } = responseLogin.body;
    expect(responseLogin.status).toBe(201);
    expect(responseLogin.body).toHaveProperty("token");

    const responseContact = await request(app)
      .post(`/contact`)
      .send(contact)
      .set("Authorization", `Bearer ${token}`);
    expect(responseContact.status).toBe(201);
    expect(responseContact.body).toEqual(expect.objectContaining(contact));

    const responseContactID = await request(app)
      .delete(`/contact/${responseContact.body.id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(responseContactID.status).toBe(200);
    expect(responseContactID.body).toEqual(expect.objectContaining({}));
  });
});
