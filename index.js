let fileContent = ""

const win0 = require("./win0.json")
const win1 = require("./win1.json")
const win3 = require("./win3.json")

const { get, put } = require('./github.js')
const { telegramConnect, sendMessage, getMessages } = require('./telegram.js')
const { extensions } = require("telegram")

const run = async () => {
  const originalContent = await get() // .data.content and .data.sha
  await telegramConnect()

  console.log("Test1:");
  fileContent = win1
  await test(fileContent)
  console.log(" ");

  console.log("Test2:");
  fileContent = win3
  await test(fileContent)
  console.log(" ");

  console.log("Test3:");
  fileContent = win0
  await test(fileContent)
  console.log(" ");

  console.log("returning the teamdata.json to the original state")
  await put(JSON.stringify(atob(originalContent.data.content)))
  console.log("done")

}

run()


const test = async (fileContent) => {
  //send the updated .json file to github 
  await put(JSON.stringify(fileContent))
  // Identify the winners
  const totals = fileContent.teamdata.map((team) => { return { ...team, total: team.actividades.reduce((acc, activity) => acc + activity.puntos, 0) } })
  const max = totals.reduce((acc, team) => acc.total > team.total ? acc : team).total
  const winners = totals.filter((team) => team.total === max)
  // Obtain the messages from telegram
  const messages = await getMessages()

  console.log("ganadores: ", winners.map((team) => team.name.toUpperCase()))
  let ok = true
  for (let i = 0; i < winners.length && ok === true; i++) {
    if (!messages[0].message.toUpperCase().includes(winners[i].name.toUpperCase())) {
      ok = false
    }

  }

  if (ok) {
    console.log("test passed")
  } else {
    console.log("message not found on telegram group")
  }

}