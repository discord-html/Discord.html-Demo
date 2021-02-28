function send_msg(token, content, channel_id) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', `https://discordhtml-api.guacaplushy2.repl.co/send`);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.setRequestHeader('Bot-Token', `${token}`);
  xhr.setRequestHeader('Channel-ID', `${channel_id}`);
  xhr.send(JSON.stringify({ content: content }));
};

var htimes = 0

class Bot extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const token = this.getAttribute('token');
    const prefix = this.getAttribute('prefix').replace(" ", " ");
    const start_status = this.getAttribute('status');
    const user_os = find_os()
    const hidden_token = token.split(".")
    console.log(`Logging in with token: ${hidden_token[0]}.${"*".repeat(hidden_token[1].length)}.${"*".repeat(hidden_token[2].length)}`)
    //const gateway = new WebSocket("wss://gateway.discord.gg/?v=6&encoding=json")
    gateway = new WebSocket("wss://gateway.discord.gg/?v=6&encoding=json")
    gateway.onmessage = (message) => {
      if (JSON.parse(message.data).op === 0) {
        if (JSON.parse(message.data).t === "MESSAGE_CREATE") {
          const msg = JSON.parse(message.data).d
          msg.author.bot = msg.author.bot || false
          if (msg.author.bot) return;
          if (msg.author.id === atob(hidden_token[0])) return;
          if (!msg.content.startsWith(prefix)) return;
          const backup_sts = () => {
            //if (msg.content.startsWith(`${prefix}status`)) {
            var new_status = msg.content.split(`${prefix}status`)
            new_status = new_status[1].replace(' ', '')
            gateway.send(JSON.stringify({
              "op": 3,
              "d": {
                "since": null,
                "activities": [{
                  "name": new_status,
                  "type": 0
                }],
                "status": "online",
                "afk": false
              }
            }))
            send_msg(token, "Set!", msg.channel_id)
          }
          run_cmd(msg, token, prefix)
        } else if (JSON.parse(message.data).t === "READY") {
          console.log("Bot is ready!")
        }
      } else if (JSON.parse(message.data).op === 11) {
        console.log("Heartbeat recieved!")
      } else if (JSON.parse(message.data).t === "READY") {
        console.log("Bot is ready!")
      } else if (JSON.parse(message.data).op === 10) {
        console.log("Connected to the gateway.")
        gateway.send(JSON.stringify({
          "op": 2,
          "d": {
            "token": token,
            "intents": 513,
            "properties": {
              "$os": user_os,
              "$browser": "discord.html demo",
              "$device": "discord.html demo"
            },
            "presence": {
              "activities": [{
                "name": start_status,
                "type": 0
              }],
              "status": "online",
              "afk": false
            },
          }
        }))
        setInterval(() => {
          gateway.send(JSON.stringify({
            "op": 1,
            "d": htimes
          }))
          console.log("Sent heartbeat to gateway.")
          htimes = htimes + 1
        }, JSON.parse(message.data).d.heartbeat_interval)
      } else {
        console.log(JSON.parse(message.data))
      }
      /*gateway.send(JSON.stringify({
        "op": 2,
        "d": {
          "token": token,
          "intents": 513,
          "properties": {
            "$os": "linux",
            "$browser": "discord.html",
            "$device": "discord.html"
          },
          "presence": {
            "activities": [{
              "name": "discord.html",
              "type": 0
            }],
            "status": "online",
            "afk": false
          },
        }
      }))*/
    }
    /*
    gateway.send({
      "op": 2,
      "d": {
        "token": token,
        "intents": 513,
        "properties": {
          "$os": "linux",
          "$browser": "discord.html",
          "$device": "discord.html"
        }
      }
    })
    */
  }
}
customElements.define('new-bot', Bot);
document.getElementById("inf").innerHTML = "<center><p>The logs are in the developer console.</p></center>"