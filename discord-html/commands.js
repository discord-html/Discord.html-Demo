function run_cmd(message, token, prefix) {
  var args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  args = `${args}`.split(",").join(" ")
  var runner = document.createElement('script')
  runner.innerText = `${command}_cmd('${token}', ${JSON.stringify(message)}, '${args}')`
  document.body.appendChild(runner)
}