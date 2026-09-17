import http from "node:http";
import { restaurantName, city, isOpen } from "./restaurant.js";

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/restaurant") {
    const restaurant = {
      restaurantName,
      city,
      isOpen,
    };

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(restaurant));

    return;
  }

  res.statusCode = 404;
  res.setHeader("Content-TYpe", "text/plain");
  res.end("Not Found");
});

server.listen(3000);
