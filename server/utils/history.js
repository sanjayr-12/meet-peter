export function chatHistory(history) {
    if (!history || history.length === 0) {
        return "there is no conversation history"
    }

    let formatHistory = "conversation history:\n"
    for (const data of history) {
        formatHistory+=`User: ${data.messages.user}\n`
        formatHistory+=`Peter: ${data.messages.ai}\n`
    }
    return formatHistory
}