#!/usr/bin/env node
import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
async function main() {
    const res = await inquirer.prompt({
        name: "userInput",
        type: "number",
        message: "Please enter the amount of seconds",
        validate: (input) => {
            if (isNaN(input)) {
                return "Please enter a valid number";
            }
            else if (input > 60) {
                return "Seconds must be 60 or less";
            }
            else {
                return true;
            }
        },
    });
    let input = res.userInput;
    function startTime(val) {
        const intTime = new Date().getTime() + val * 1000;
        const interval = setInterval(() => {
            const currTime = new Date().getTime();
            const timeDiff = differenceInSeconds(new Date(intTime), new Date(currTime));
            if (timeDiff <= 0) {
                console.log("Timer has expired");
                clearInterval(interval);
                process.exit();
            }
            const min = Math.floor(timeDiff / 60);
            const sec = timeDiff % 60;
            console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
        }, 1000);
    }
    startTime(input);
}
main();
