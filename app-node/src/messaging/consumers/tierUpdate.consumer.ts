import amqp from "amqplib";
import { User } from "../../models/index.js";

const RABBITMQ_URL = process.env.RABBITMQ_URL ?? "amqp://guest:guest@rabbitmq";
const QUEUE = "user.tier.updates";

const connectWithRetry = async (retries = 10, delayMs = 3000): Promise<amqp.Connection> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const conn = await amqp.connect(RABBITMQ_URL);
      console.log("[RabbitMQ] Connected");
      return conn;
    } catch {
      console.log(`[RabbitMQ] Attempt ${attempt}/${retries} failed, retrying in ${delayMs}ms...`);
      if (attempt === retries) throw new Error("[RabbitMQ] Max retries reached");
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  throw new Error("unreachable");
};

export const startTierUpdateConsumer = async () => {
  const connection = await connectWithRetry();
  const channel = await connection.createChannel();

  await channel.assertQueue(QUEUE, { durable: true });
  channel.prefetch(1);

  channel.consume(QUEUE, async (msg) => {
    if (!msg) return;
    try {
      const { userId, tier } = JSON.parse(msg.content.toString()) as {
        userId: string;
        tier: string;
      };
      await User.update({ tier }, { where: { id: userId } });
      console.log(`[RabbitMQ] User ${userId} tier updated → ${tier}`);
      channel.ack(msg);
    } catch (err) {
      console.error("[RabbitMQ] Failed to process message:", err);
      channel.nack(msg, false, false);
    }
  });

  console.log(`[RabbitMQ] Consumer listening on "${QUEUE}"`);
};
