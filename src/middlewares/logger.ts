import { NextFunction, Request, Response } from "express";
import fs from "fs";

const logger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = new Date();
  const timeStamp = startTime.toLocaleString();

  //after response is sent
  res.on("finish", () => {
    const endTime = new Date();
    const elapsedTime = endTime.getTime() - startTime.getTime();
    const logMessage = `[${timeStamp}] | Method: ${req.method} | URL: ${req.url} | Time Taken: ${elapsedTime}ms\n`;
    fs.appendFile(`${__dirname}/../logs/logs.txt`, logMessage, (err) => {
      if (err) {
        console.log("Error writing log:", err);
      }
    });
  });

  next();
};
export default logger;
