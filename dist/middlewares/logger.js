"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const logger = (req, res, next) => {
    const startTime = new Date();
    const timeStamp = startTime.toLocaleString();
    //after response is sent
    res.on("finish", () => {
        const endTime = new Date();
        const elapsedTime = endTime.getTime() - startTime.getTime();
        const logMessage = `[${timeStamp}] | Method: ${req.method} | URL: ${req.url} | Time Taken: ${elapsedTime}ms\n`;
        fs_1.default.appendFile(`${__dirname}/../logs/logs.txt`, logMessage, (err) => {
            if (err) {
                console.log("Error writing log:", err);
            }
        });
    });
    next();
};
exports.default = logger;
