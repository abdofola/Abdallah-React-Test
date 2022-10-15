import { rest, setupWorker } from "msw";

const delay = process.env.NODE_ENV === "test" ? 0 : 1500;
export const handlers = [
  rest.post(
    "https://jsonplaceholder.typicode.com/users",
    async (req, res, ctx) => {
      const { username, password } = req.body;
      if (!username) {
        return res(
          ctx.delay(delay),
          ctx.status(403),
          ctx.json({ message: "username required" })
        );
      }
      if (!password) {
        return res(
          ctx.delay(delay),
          ctx.status(400),
          ctx.json({ message: "password required" })
        );
      }

      return res(ctx.delay(delay), ctx.status(200), ctx.json({ username }));
    }
  ),
];
