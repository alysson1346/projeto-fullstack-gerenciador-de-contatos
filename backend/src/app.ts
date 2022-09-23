import express from "express";
import routesUsers from "./routes/user.routes";
import routesContact from "./routes/contact.routes";

const app = express();

app.use(express.json());

app.use("/users", routesUsers);
app.use("/contact", routesContact);

export default app;
