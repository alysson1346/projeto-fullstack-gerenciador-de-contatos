import express from "express";
import routesUsers from "./routes/user.routes";
import routesContact from "./routes/contact.routes";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());

app.use("/users", routesUsers);
app.use("/contact", routesContact);

export default app;
