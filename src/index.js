import Fastify from "fastify";
import callMe from "../controller/callMe.js";
import animeController from "../controller/animeController.js";
import fastifyPostgres from "@fastify/postgres";

const app = Fastify({
  logger: true,
});

// database
app.register(fastifyPostgres,{
  host:'localhost',
  user:'postgres',
  password:'postgres',
  database:'dev-fastify',
  promise:true
});



// controllers

app.register(animeController, { prefix: '/anime' });
// app.register(callMe, { prefix: '/call' });

app.get("/", (req, reply) => {
  return { 1: "hello", 2: "world" };
});

app.get("/a", (req, reply) => {
  reply.send({ hello: "world" });
});


// http://127.0.0.1:8000/cool/dhananjay?level=10
app.route({
  method: "GET",
  url: "/cool/:name",
  schema: {
    querystring: {
      properties: {
        level: { type: "number" },
      },
      required: ["level"],
    },
    params: {
      properties: {
        name: { type: "string" },
      },
      required: ["name"],
    },
    response: {
      200: {
        properties: {
          message: { type: "string" },
        },
        required: ["message"],
      },
    },
  },
  handler: (req, reply) => {
    let name = req.params.name;
    reply.send({
      message: `${name} is cool and his level is ${req.query.level}`,
    });
  },
});

try {
  app.listen({ port: 8000 });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
