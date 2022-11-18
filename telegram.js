// Telegram API, your ID and HASH
const api_id = 12345678
const api_hash = "592e6a15c814a02a1c21310117fa490f"
const groupName = "winbottest"
// fill this later with the value from session.save()
let sessionString = "" || "1BBADBTQ5BjE1BCBxNjcuOTEAUDUw9oz43ROe620L/XTrDmGw9WBnKpokPtimMSF894OrMPJ88ySR8rNeBJvyXtsM8JN8M8IuqjoOgaAzu5hzQio1N7fKrLKvvZO6XnCJyFb9y8g+yoRJhGRhla4hZFjOEbRpu9W5bFOW1oGqqERhHvyPc4Nkyv5ETNeZxZslf8fSHRdIDZc6zpnrJTKGBwxZA8kgY5WJN+YzKTp3xaVYMtz8jHu97nPlVGI5Eou8e34sRSTTcCIRkp8w0R6EG2dGAKo1XaKTAGVP/Jqo7KSZ4nEVfqFAUl8zwsiPiaXAs1JVn8+xnIWmh3x4zXlR3/AycGgxATaC86ua5pmLsanAGQA="

const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input");
const session = new StringSession(sessionString);

const client = new TelegramClient(
  session, api_id, api_hash, {
  connectionRetries: 5,
});

const connect = async () => {
  console.log("Loading interactive session...");

  await client.start({
    phoneNumber: async () => await input.text("Please enter your number, example: +346"),
    password: async () => await input.text("Please enter your password: "),
    phoneCode: async () =>
      await input.text("Please enter the code you received: "),
    onError: (err) => console.log(err),
  });
  console.log("Connected with telegram, this is your session string:");
  console.log(client.session.save()); // Save this string to avoid logging in again
  console.log(" ");
  console.log(" ");



}


const getMessages = async () => {
  const datos = await client.getMessages("winbottest")

  return datos
}

const sendMessage = async (message = "Default message") => {
  await client.sendMessage(groupName, { message: message });
}

exports.sendMessage = sendMessage
exports.getMessages = getMessages
exports.telegramConnect = connect
