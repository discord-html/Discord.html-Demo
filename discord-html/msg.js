function send_msg(token, content, channel_id) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', `https://discordhtml-api.guacaplushy2.repl.co/send`);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.setRequestHeader('Bot-Token', `${token}`);
  xhr.setRequestHeader('Channel-ID', `${channel_id}`);
  xhr.send(JSON.stringify({ content: content }));
};