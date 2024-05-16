const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models")
const { createToken } = require("../helper/jwt")
const hashPassword = require("../helper/bcrypt")

let access_token
const dataToInsert = {
    email: "abangku@provider.com",
    password: "abangku",
}
describe("POST users/login", () => {
    test("Login Success!", async () => {
        const response = await request(app)
            .post("/users/login")
            .send({email: dataToInsert.email, password: dataToInsert.password})
        const { body, status } = response
        access_token = body.access_token
        expect(status).toBe(200)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("access_token", access_token)
        expect(body).toHaveProperty("message", "Login Success!")

    })
    test("Login Failed, Email Must Not Empty!", async () => {
        const response = await request(app)
            .post("/users/login")
            .send({password: dataToInsert.password})
        const { body, status } = response
        expect(status).toBe(401)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", "Error Invalid Username or Email or Password")
    })
    test("Login Failed, Password Must Not Empty!", async () => {
        const response = await request(app)
            .post("/users/login")
            .send({email: dataToInsert.email})
        const { body, status } = response
        expect(status).toBe(401)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", "Error Invalid Username or Email or Password")
    })
    test("Login Failed, Email is Invalid!", async () => {
        const response = await request(app)
            .post("/users/login")
            .send({email: !dataToInsert.email, password: dataToInsert.password})
        const { body, status } = response
        expect(status).toBe(401)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", "Error Invalid Username or Email or Password")
    })
    test("Login Failed, Password is Invalid!", async () => {
        const response = await request(app)
            .post("/users/login")
            .send({email: !dataToInsert.email, password: dataToInsert.password})
        const { body, status } = response
        expect(status).toBe(401)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", "Error Invalid Username or Email or Password")
    })
})

describe("POST users/register", () => {
    test("Register Success!", async () => {
        const dataToRegister = {
            username: "testing1",
            email: "testing1@provider.com",
            password: "testing1",
            imageUrl: "https://cdn.vox-cdn.com/thumbor/4E98u_RfYxa8pkRK79CyPClFABY=/0x0:1147x647/1200x800/filters:focal(483x233:665x415)/cdn.vox-cdn.com/uploads/chorus_image/image/70742090/Jotaro.0.jpeg",
            phoneNumber: "789123456",
            address: "jl suka cita damai"
        }
        const response = await request(app).post("/users/register").send(dataToRegister)
        const { body, status } = response;

        expect(status).toBe(201)
        expect(body).toBeInstanceOf(Object)
        expect(body.article).toHaveProperty("username", "testing1")
        expect(body.article).toHaveProperty("email", "testing1@provider.com")
        expect(body.article).toHaveProperty("password", "testing1")
        expect(body.article).toHaveProperty("imageUrl", "https://cdn.vox-cdn.com/thumbor/4E98u_RfYxa8pkRK79CyPClFABY=/0x0:1147x647/1200x800/filters:focal(483x233:665x415)/cdn.vox-cdn.com/uploads/chorus_image/image/70742090/Jotaro.0.jpeg")
        expect(body.article).toHaveProperty("phoneNumber", "789123456")
        expect(body.article).toHaveProperty("address", "jl suka cita damai")
    })
})