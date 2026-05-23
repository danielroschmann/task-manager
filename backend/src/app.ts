import express from "express";
import cors from "cors";
import taskRoutes from "./routes/task.routes.js";
import elRoutes from "./routes/electricityprices.routes.js";
import eventRoutes from "./routes/event.routes.js";
import calendarRoutes from "./routes/calendar.routes.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use('/tasks', taskRoutes);
app.use('/', elRoutes);
app.use('/event', eventRoutes);
app.use('/calender', calendarRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});




export default app;
