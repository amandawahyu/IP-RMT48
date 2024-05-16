const request = require("supertest");
const app = require("../app");
const { Favorite, User } = require("../models");

let access_token;

beforeAll(async () => {
    try {
        const user = await User.create({
            email: "abangku@provider.com",
            password: "abangku",
        });
        const favorite = await Favorite.create({
            myManhwaAndMangaId: "4d7be19c-8258-436c-a091-46856b6d6022",
            title: "Taram Taram Taram",
            description: "“Dawn” entered the hall with her calm movements and stood in the middle. Her face showed no emotions, like a doll, but she was captivating and elegant, strikingly like an ice queen. Exer smiled lightly, spread her legs, and said, ‘As Lord, I will embrace you tonight.’ A fateful encounter for the first time. A woman falls in love at first sight. And a man fights the world for this woman. ‘If this world cannot accept her as a wife, then I will change this world.’ A love story between Dawn, the Eastern girl who endured a tough childhood while fleeing from war and became a slave, and Exer, the handsome man who was known as the strongest warrior in the kingdom.",
            UserId: 1,
        });
    } catch (error) {
        console.log(error, "<<< before all");
    }
});

describe("/manhwasAndMangas/favorites", () => {
    test(`success get manhwasAndMangas favorites`, async () => {
        const response = await request(app)
            .get(`/manhwasAndMangas/favorites`)

            .set("Authorization", `Bearer ` + access_token);

        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Object);
    });

    test(`success delete favorites`, async () => {
        const response = await request(app)
            .delete(`/manhwasAndMangas/favorites`)
            .send({ id: 1 })
            .set("Authorization", `Bearer ` + access_token);

        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Object);
    });
});
// !============

afterAll(async () => {
    try {
        await Favorite.destroy({
            where: {},
            truncate: true,
            cascade: true,
            restartIdentity: true,
        });
        await User.destroy({
            where: {},
            truncate: true,
            cascade: true,
            restartIdentity: true,
        });
    } catch (error) {
        console.log(error, "<<<< afterAll");
    }
});
