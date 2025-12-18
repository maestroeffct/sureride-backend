import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes/routes";
import { health } from "./health";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/health", health);
app.use("/api", routes);

// jmn

export default app;
