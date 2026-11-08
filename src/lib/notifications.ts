import fs from "fs";
import path from "path";

export interface ToolSubmissionNotification {
  toolName: string;
  websiteUrl: string;
  tagline?: string;
  category?: string;
  planId: string;
  planName: string;
  amountPaid: number; // e.g. 19 or 49
  contactEmail: string;
  sessionId?: string;
  isPaid: boolean;
  timestamp?: string;
}

/**
 * Dispatches instant notifications to the site owner whenever a tool is submitted or paid for.
 * Supports:
 * - Discord Webhooks (DISCORD_WEBHOOK_URL)
 * - Telegram Bot (TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID)
 * - Local Persistent File Log (data/submissions.json)
 */
export async function notifyOwnerOfSubmission(data: ToolSubmissionNotification): Promise<void> {
  const timestamp = new Date().toISOString();
  const payload = { ...data, timestamp };

  console.log(`[ListAIAssets Notification] New ${data.isPaid ? "PAID" : "FREE"} Submission:`, {
    tool: data.toolName,
    plan: data.planName,
    amount: `$${data.amountPaid}`,
    url: data.websiteUrl,
    founder: data.contactEmail,
  });

  // 1. Persistent Local File Backup (Ensures zero data loss)
  try {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const submissionsFile = path.join(dataDir, "submissions.json");
    let existing: any[] = [];
    if (fs.existsSync(submissionsFile)) {
      try {
        existing = JSON.parse(fs.readFileSync(submissionsFile, "utf-8"));
      } catch (e) {
        existing = [];
      }
    }
    existing.unshift(payload);
    fs.writeFileSync(submissionsFile, JSON.stringify(existing, null, 2), "utf-8");
  } catch (fileErr) {
    console.warn("[Notifications] Could not append to local submissions.json:", fileErr);
  }

  // 2. Discord Webhook Notification
  const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (discordWebhookUrl && discordWebhookUrl.startsWith("http")) {
    try {
      await fetch(discordWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "ListAIAssets Alerts",
          avatar_url: "https://listaiassets.com/icon.png",
          embeds: [
            {
              title: data.isPaid
                ? `💰 New Paid Tool Submission: ${data.toolName}`
                : `📝 New Free Submission: ${data.toolName}`,
              description: `A founder has submitted **${data.toolName}** for index review on ListAIAssets.`,
              color: data.isPaid ? 0xf59e0b : 0x78716c, // Amber for paid, muted stone for free
              fields: [
                { name: "Plan Tier", value: `${data.planName} ($${data.amountPaid})`, inline: true },
                { name: "Website", value: `[${data.websiteUrl}](${data.websiteUrl})`, inline: true },
                { name: "Founder Email", value: data.contactEmail || "Not provided", inline: true },
                { name: "Category", value: data.category || "Unassigned", inline: true },
                { name: "Tagline", value: data.tagline || "N/A", inline: false },
                { name: "Stripe Session", value: data.sessionId || "Free queue", inline: false },
              ],
              footer: { text: "ListAIAssets Admin Dispatcher • listaiassets.com" },
              timestamp,
            },
          ],
        }),
      });
    } catch (discordErr) {
      console.error("[Notifications] Discord webhook failed:", discordErr);
    }
  }

  // 3. Telegram Bot Notification
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;
  if (telegramBotToken && telegramChatId) {
    try {
      const messageText = `🚀 *New ${data.isPaid ? "PAID" : "Free"} Tool Submission on ListAIAssets!*\n\n` +
        `• *Tool:* ${data.toolName}\n` +
        `• *Plan:* ${data.planName} ($${data.amountPaid})\n` +
        `• *Website:* ${data.websiteUrl}\n` +
        `• *Founder:* ${data.contactEmail}\n` +
        `• *Tagline:* ${data.tagline || "N/A"}\n\n` +
        `👉 Action: Review and publish on listaiassets.com/tools`;

      await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: messageText,
          parse_mode: "Markdown",
        }),
      });
    } catch (telegramErr) {
      console.error("[Notifications] Telegram notification failed:", telegramErr);
    }
  }
}

