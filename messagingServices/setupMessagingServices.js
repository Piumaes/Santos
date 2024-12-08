const fs = require("fs")

exports.setupMessagingServices = (sock, from, messageDetails) =>{
  
  const enviarAudioGravacao = async(arquivo) =>{
    await sock.sendMessage(from,{ audio: fs.readFileSync(arquivo), mimetype: "audio/mp4", ptt: true }, {quoted: messageDetails})
  }
  
  const enviarImagem = async(arquivo, text) =>{
    await sock.sendMessage(from,{ image: fs.readFileSync(arquivo), caption: text },{quoted: messageDetails})
  }
  
  const enviarMensagem = async(text, mention) =>{ await sock.sendMessage(from, {text: `${text}`, mentions: mention}, {quoted: messageDetails})

}
  
  return{
    enviarAudioGravacao,
    enviarImagem,
    enviarMensagem,
  }
  
}