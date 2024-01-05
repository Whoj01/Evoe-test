import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";

import { AddressInfo } from "net";
import "dotenv/config";
import { userRoutes } from "./routes/user";


const server: FastifyInstance = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "SYS:HH:MM:ss",
        colorize: true,
      },
    },
  },
});

const PORT = process.env.PORT || 8081;

server.register(cors, {
	origin: "*",
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization"],
});

server.register(userRoutes)

const start = async () => {
	try {
		await server.listen({ port: PORT as number, host: '0.0.0.0' });

		const { address } = server.server.address() as AddressInfo;

		server.log.info(`Server listening at ${address}:${PORT}`);
	} catch (err: any) {
		server.log.error("Error starting server", err.message);
		process.exit(1);
	}
};

start();