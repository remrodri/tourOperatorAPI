import { app } from "@/server";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import request from "supertest";

const MONGO_URI = "mongodb://localhost:27017/test_db";

describe("Auth - Register and Login", () => {
  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGO_URI);
    }
  });

  // afterEach(async () => {
  //   //limpiar la bd
  //   await mongoose.connection.db?.dropDatabase();
  // })

  afterAll(async () => {
    await mongoose.connection.close();
  });
  // beforeEach(async () => {
  //   const collections = mongoose.connection.collections;
  //   for (const key in collections) {
  //     await collections[key].deleteMany({});
  //   }
  // });

  // it("deberia registrar un nuevo usuario correctamente", async () => {
  //   const res = await request(app).post("/auth/register").send({
  //     firstName: "John",
  //     lastName: "Doe",
  //     phone: "1234567890",
  //     email: "john.doe@example.com",
  //     ci: "1234567",
  //     password: "mypassword",
  //   });

  //   expect(res.status).toBe(StatusCodes.CREATED); //codigo de exito
  //   expect(res.body.message).toBe("User registered succesfully");
  //   // expect(res.body.data).toHaveProperty('token');
  //   expect(res.body.data).toHaveProperty("id");
  //   expect(res.body.data).toHaveProperty("firstName");
  //   expect(res.body.data).toHaveProperty("lastName");
  //   expect(res.body.data).toHaveProperty("phone");
  //   expect(res.body.data).toHaveProperty("email");
  //   expect(res.body.data).toHaveProperty("firstLogin");
  // });

  it("deberia retornar error si el email ya esta registrado", async () => {
    const res = await request(app).post("/auth/register").send({
      firstName: "John",
      lastName: "Doe",
      phone: "1234567890",
      email: "john.doe@example.com", // ya registrado
      ci: "1234567",
      password: "mypassword",
    });
    expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body.message).toBe("User already exists");
  });

  it("deberia logear correctamente", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "john.doe@example.com",
      password: "mypassword",
    });

    expect(res.status).toBe(StatusCodes.OK);
    expect(res.body.message).toBe("User logged in succesfully");
    expect(res.body.data).toHaveProperty("token");
  });

  it("deberia retornar error con credenciales invalidas", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "john.doe@example.com",
      password: "invalidpassword", // credenciales invalidas
    });
    expect(res.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(res.body.message).toBe("Invalid credentials");
  });
});
