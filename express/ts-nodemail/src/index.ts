import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 4300;

app.get("/", (req: Request, res: Response) => {
  res.send(`<div>
    <h1>Server online</h1>
    </div>`);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
