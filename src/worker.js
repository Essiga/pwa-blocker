import {giveMePi} from "./modules/madhava-leibniz.js";

onmessage = (event) => {
    const message = event.data;
    if(message === "giveMePi"){
        let guess = giveMePi(5);
        postMessage(guess);
    }

    console.debug(`worker got message: {requestClockTicks: ${message}}`);

}

onerror = (errorEvent) => {
    console.debug(`Error in worker: ${errorEvent.message}`);
}