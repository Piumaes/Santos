const path = require("path");
const {
  default: makeWASocket,
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
} = require("@whiskeysockets/baileys");
const readline =require("readline")
const pino = require("pino");
const {handleCommands } = require("./handleCommands.js")

const question = (string) =>{
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  return new Promise((resolve) => rl.question(string, resolve))
}

exports.connect = async () => {
  const { state, saveCreds } = await useMultiFileAuthState(
    path.resolve(__dirname, ".", "assets", "auth", "creds")
  );

  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    printQRInTerminal: false,
    version,
    logger: pino({ level: "silent" }),
    auth: state,
    browser: ["Ubuntu", "Chrome", "20.0.04"],
    markOnlineOnConnect: true,
  });

  if (!sock.authState.creds.registered) {
     phoneNumber = await question("Informe o seu número de telefone: ");
     phoneNumber = phoneNumber.replace(/[^0-9]/g, "");

    if (!phoneNumber) {
      throw new Error("Número de telefone inválido!");
    }

    const code = await sock.requestPairingCode(phoneNumber);

    console.log(`Código de pareamento: ${code}`);
  }

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
        console.log("Conexão fechada devido ao error:", lastDisconnect.error, "Fazendo reconexão...", shouldReconnect);

      if (shouldReconnect) {
        this.connect();
      }
    }else if (connection === "open") {
      console.log(`Sussess Connection!`)
    }
  });

  sock.ev.on("creds.update", saveCreds);

handleCommands(sock)
  return sock;
};
this.connect()