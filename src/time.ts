import { CountDown } from "teddi-lodash";
import { updateCountdown } from "./ui";
import { onUserTimeout } from "./user";

const countdown = new CountDown({
    intervalDelay: 1000,

    onTick: (total) => {
        updateCountdown(Math.ceil(total / 1000))
        console.log('onTick', Math.ceil(total / 1000))
    },
    
    onComplete: () => {
        alert('时间到，游戏结束');
        onUserTimeout();
    }

});

export const startCountdown = () => {
    countdown.start({
        date: Date.now() + 60 * 1000,
    });
}

export const stopCountdown = () => {
    countdown.stop();
}
