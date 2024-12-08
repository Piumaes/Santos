const { extractMessages } = require("./extractMessages.js")
const { setupMessagingServices } = require("./messagingServices/setupMessagingServices.js");
const { menuCaption } = require("./features/menuCaption.js");

exports.handleCommands = async (sock) =>{
  sock.ev.on("messages.upsert", async ({ messages })=>{
    
    const messageDetails = messages[0];
    
    if(!messageDetails.message) return
    
    try{
      
      const { finalMessageText, from, isCommand, commandName, args, userName} = extractMessages(messageDetails);
      const { enviarAudioGravacao, enviarMensagem, enviarImagem } = setupMessagingServices(sock, from, messageDetails)
      
      switch(commandName){
      
      case "au":
          case "help":
            enviarMensagem("🚨MAROBÁ PRODUTOS DE LIMPEZA🚨"+"\n"+     "\n🔸️🔸️🔸️🔸️🔸️🔸️🔸️🔸️🔸️🔸️"+"\n"+
   "\n➡️SABÃO LÍQUIDO 5L 💰$30,00"+"\n"+        "========================"+"\n"+                   "\n➡️SABÃO EM PASTA 500KG 💰$12,00"+     "\n"+      "========================"+"\n"+          "\n➡️SABÃO LÍQUIDO DE COCÔ 5L 💰$40,00"+"\n"+         "========================"+"\n"+
    "\n➡️AMACIANTE 5L 💰$25,00"+"\n"+             "========================"+"\n"+
    "\n➡️CLORO BRANCO 5L 💰$18,00"+"\n"+                 "========================"+"\n"+
    "\n➡️LIMPA ALUMÍNIO 5L 💰$50,00"+"\n"+          "========================"+"\n"+
    "\n➡️DETERGENTE NEUTRO 5L 💰$25,00"+"\n"+            "========================"+"\n"+
    "\n➡️VEJA MULT USO 2L 💰$18,00"+"\n"+         "========================"+"\n"+
    "\n➡️LIMPA ALUMÍNIO 2L 💰$18,00"+"\n"+        "========================"+"\n"+
    "\n➡️PINHO GEL 2L 💰$18,00"+"\n"+             "========================"+"\n"+
    "\n➡️SABONETE LÍQUIDO 1L 💰$18,00"+"\n"+      "========================"+"\n"+                 "\n➡️SODA CÁUSTICA 1KG💰$32,00"+"\n"+      "========================"+"\n"+                   "\n➡️SODA CÁUSTICA LÍQUIDA 1L 💰$20,00"+"\n"+      "========================"+"\n"+           "\n 🛵entregamos na sua casa 🏠 \n"+"\n"+                                        " "+"\n"+
    "\n השבח לאל")
         break;
        
        case "im":
          case "help":
            enviarImagem("assets/imagens/menu.jpg")
         break;
         
        case "adi":
          case "adivinhar":
        if(args < 1 || args > 10){
        await enviarMensagem("Voce precisa digitar um numero de 1 a 10")
        return

}
        let numberAdivinhe = Math.floor(Math .random()*10)+1
        if(numberAdivinhe == args) {
        await enviarMensagem (`Parabens ${userName}, Voce acertou o numero correto era: ${numberAdivinhe}`)

}else{ 
await enviarMensagem(`Que pena, vc errou! o numero correto era: ${numberAdivinhe}`)

}
         break;
        
        case "menu":
          case "help":
            enviarImagem("assets/imagens/menu.jpg", menuCaption(userName))
            
            break;
        
      }
      
    }catch(error){
      console.log("ocorreu um erro:", error)
    }
    
    
  })
}