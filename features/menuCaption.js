const { PREFIX, BOT_NAME } = require("../settings.json")

exports.menuCaption = (userName) =>{
  return`╭─═════༻-༺════─╮
[ ✧ ]  Me: ${BOT_NAME}
[ ✧ ]  Prefix: ﹙${PREFIX} )
[ ✧ ]  Status: Online
[ ✧ ]  Usuário: ${userName}
╰─═════༻-༺═══──╯`
}