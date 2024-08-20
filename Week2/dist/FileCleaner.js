"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const fileCleaner = () => __awaiter(void 0, void 0, void 0, function* () {
    let retrievedData = "";
    fs_1.default.readFile("D:/100x/a.txt", "utf-8", function (error, data) {
        if (error)
            console.log(error);
        else
            retrievedData = data.replace(/\s+/g, ' ').trim();
        retrievedData.trim();
        fs_1.default.writeFile("D:/100x/a.txt", retrievedData, function (error) {
            if (error)
                console.log(error);
        });
    });
});
function removeExtraSpaces(text) {
    return text.replace(/\s+/g, ' ').trim();
}
fileCleaner();
