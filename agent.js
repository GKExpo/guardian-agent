const SERVER = "https://your-server-url.com"

let deviceId = localStorage.getItem("guardian_device")

if(!deviceId){

deviceId = crypto.randomUUID()
localStorage.setItem("guardian_device",deviceId)

}

document.getElementById("status").innerText =
"Device ID: " + deviceId


async function sendMetrics(){

let connection = navigator.connection || {}

const data = {

device_id: deviceId,
traffic: Math.floor(Math.random()*100),

connection: connection.effectiveType || "unknown",
downlink: connection.downlink || 0,
latency: connection.rtt || 0,

userAgent: navigator.userAgent

}

fetch(SERVER + "/devices/update",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(data)

})

}

setInterval(sendMetrics,3000)
