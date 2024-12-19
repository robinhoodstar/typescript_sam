/// <reference path="./types/express.d.ts" />

import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

export type User = {
  id: string;
  email: string;
  name: string;
};

/*/ 
  declare global {
    namespace Express {
      interface Request {
        user?: User;
      }
    }
  } 
/*/

const attachUser = (req: Request, res: Response, next: NextFunction) => {
  req.user = {
    id: "123",
    email: "example@example.com",
    name: "John Doe",
  };
  next();
};

app.use(attachUser);

// Example route using req.user
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello World!",
    user: req.user,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
