import {giveMePi} from "./modules/madhava-leibniz.js";

const ports = new Set();

function broadcastMessage(message) {
    for (const port of ports) {
        try {
            port.postMessage(message);
        } catch (err) {
            ports.delete(port);
        }
    }
}

self.onconnect = (connectEvent) => {
    console.log("connected");
    const port = connectEvent.ports[0];
    ports.add(port);
    port.onmessage = (event) => {
        const data = event.data;
        console.log("onmessage triggered")
        if(data.message === "giveMePi"){
            broadcastMessage({message: "running"})
            let guess = giveMePi(5);
            console.log("pi calculated")
            broadcastMessage({message: data.message, pi: guess});
        }
    }
};

self.onerror = (errorEvent) => {
    console.debug(`Error in sharedWorker: ${errorEvent.message}`);
}

// setInterval(
//     () => broadcastMessage({guess: ""}),
//     1000
// );