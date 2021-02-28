function start() {
  const token = document.getElementById('booter').textContent
  const prefix = document.getElementById('prefix').textContent.replace(' ', 'e')
  const status = document.getElementById('status').textContent || "discord.html"
  includer = document.createElement('script')
  includer.setAttribute('src', 'discord-html/bot.js')
  includer.setAttribute('async', '')
  includer.setAttribute('defer', '')
  main = document.createElement('new-bot')
  main.setAttribute('token', token)
  main.setAttribute('prefix', prefix)
  main.setAttribute('status', status)
  document.body.appendChild(includer)
  document.body.appendChild(main)
}