# Hinatazaka46 Blog Monitor

> ⛅ A simple bot that monitors [Hinatazaka46](https://www.hinatazaka46.com) member blogs and posts updates to Discord.

## ✨ Features

- Fetches the latest blog post for each configured member
- Detects when a new post is published
- Notifies a Discord channel via webhook
- Maintains a local `last_seen.json` state to avoid duplicate notifications
- Includes robust error handling with custom error classes
- Unit tested with [Bun](https://bun.sh) ✅

---

## 📦 Requirements

- [Bun](https://bun.sh) v1.2+ (runtime & test runner)
- A Discord webhook URL (from your Discord server settings)

---

## ⚙️ Configuration

All environment variables are managed via `.env` or your shell:

| Variable            | Description                        | Example                                         |
|---------------------|------------------------------------|-------------------------------------------------|
| `DISCORD_WEBHOOK`   | Your Discord webhook URL           | `https://discord.com/api/webhooks/.../...`      |

Other project constants are defined in [`src/config/index.ts`](src/config/index.ts), such as:

- `MEMBER_IDS`: array of member IDs to monitor.
- `STATE_FILE`: path to the JSON file used to persist last seen blogs.

---

## 🏃‍♂️ Develop by yourself

Clone and install:

```bash
git clone https://github.com/yourname/hinatazaka46-blog-monitor.git
cd hinatazaka46-blog-monitor
bun install
```

Run the monitor:
```bash
bun run src/index.ts
```

The script will:
- Validate environment variables
- Load the last seen state from `last_seen.json` (if it exists)
- For each member in MEMBER_IDS:
- - Fetch the latest blog
- - Compare with last seen
- - Post to Discord if new
- Save updated state back to disk

---

## 🧪 Testing

This project uses Bun’s built-in test runner.

Run all tests:
```bash
bun test
```

You can also run specific test files:
```bash
bun test src/utils/http.test.ts
```

Run with coverage:
```bash
bun test --coverage
```

Example output:
```bash
✓ httpClient.get returns response text when successful
✓ httpClient.get throws HttpError on failure
✓ httpClient.post announces a blog when the latest blog found
✓ httpClient.post throws HttpError on failure
---------------------|---------|---------|-------------------
File                 | % Funcs | % Lines | Uncovered Line #s
---------------------|---------|---------|-------------------
All files            |   100.0 |   100.0 |
```

---

## 🚀 Deploy to Github w/ Github Actions

1. You can fork this repository to your own GitHub account.
2. Go to your repository settings.
3. Navigate to "Secrets and variables" > "Actions" > "Secrets" > "New repository secret".
4. Add a new secret named `DISCORD_WEBHOOK` with your Discord webhook URL.
5. Congratulate yourself! 🎉

### 🤔 How can I get Discord webhook URL?
1. Go to your Discord server.
    - If you don't have a server, create one.
    - If you don't have Discord, download it from [discord.com](https://discord.com).
2. Choose one of the channels you want to post updates to.
3. Click the gear icon to open channel settings or right-click the channel name.
4. Click "Edit Channel" option.
![Discord Channel](https://raw.githubusercontent.com/alfianchii/hinatazaka46-blog-feeds/refs/heads/main/public/images/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202025-08-17%2017.11.16.png?raw=true)
5. Navigate to the "Integrations" tab.
6. Choose "Webhooks".
![Discord Integrations](https://github.com/alfianchii/hinatazaka46-blog-feeds/blob/main/public/images/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202025-08-17%2017.11.37.png?raw=true)
7. Click "New Webhook".
8. Set a name for your webhook (e.g., "Hinatazaka Blog Monitor").
9. Click "Copy Webhook URL" to copy the URL.
![Discord Webhook](https://github.com/alfianchii/hinatazaka46-blog-feeds/blob/main/public/images/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202025-08-17%2017.12.09.png?raw=true)
10. Paste the URL into your `.env` file or GitHub secrets.

---

## 🙌 Contributing

PRs and issues welcome! Please:
- Fork the repo.
- Create a feature branch (`git checkout -b feature/awesome`).
- Commit your changes (`git commit -m "Add awesome feature"`).
- Push to your fork and open a PR.

---

## 💡 Inspiration

- Hinatazaka46 blog culture 🌸.
- Desire to keep fans updated in Discord.
- Practice with Bun, TypeScript, and clean architecture.

## 📜 License
This project is licensed under the MIT License. See the [MIT LICENSE](./LICENSE) file for details.

## 🧍 Author
This project is maintained by [alfianchii](https://github.com/alfianchii).