import express from "express";
import { geminiReply } from "../utils/ai.js";
import { protect } from "../middlewares/userMiddleware.js";

const router = express.Router();

// Temporary in-memory store
const tempChatMemory = new Map();

router.post("/", protect, async (req, res) => {
  const { message, chatId } = req.body;
  const userName = req.user?.name?.split(" ")[0] || "Friend";

  if (!chatId) {
    return res.status(400).json({
      intent: "GENERAL_CHAT",
      reply: "Something went wrong. Please refresh and try again."
    });
  }

  // Initialize memory for this chat session
  if (!tempChatMemory.has(chatId)) {
    tempChatMemory.set(chatId, []);
  }

  const history = tempChatMemory.get(chatId);

  try {
    const ai = await geminiReply(message, userName, history);

    if (ai._history) {
      tempChatMemory.set(chatId, ai._history);
      delete ai._history;
    }

    if (ai.intent === "BOOK_SESSION") {
      ai.reply =
        `I'm really glad you're ready, ${userName}. ` +
        `Let’s choose a time for your private 1 on 1 session.`;
    }

    res.json(ai);
  } catch (error) {
    console.error("Chat Route Error:", error);
    res.status(500).json({
      intent: "GENERAL_CHAT",
      reply: `I'm here with you, ${userName}. Let's keep talking.`,
    });
  }
});

export default router;
