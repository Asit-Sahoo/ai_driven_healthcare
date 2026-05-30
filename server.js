const { spawn } = require("child_process");
const path = require("path");
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

const PORT = process.env.MAIN_PORT || 10000;

// =============================
// Start Node Backend
// =============================

const backend = spawn("node", ["index.js"], {
  cwd: path.join(__dirname, "backend"),
  stdio: "inherit",
  shell: true,
});

// =============================
// Start ML Flask API
// =============================

const mlApi = spawn("python", ["app.py"], {
  cwd: path.join(__dirname, "flask"),
  stdio: "inherit",
  shell: true,
});

// =============================
// Start Chatbot Flask API
// =============================

const chatbotApi = spawn("python", ["app.py"], {
  cwd: path.join(
    __dirname,
    "Disease-Symptom-Prediction-Chatbot-main"
  ),
  stdio: "inherit",
  shell: true,
});

// =============================
// PROXY BACKEND ROUTES
// =============================

app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost:5003",
    changeOrigin: true,
  })
);

// =============================
// Serve Frontend Build
// =============================
app.use(express.static(path.join(__dirname, "frontend/build")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build/index.html"));
});

// =============================
// Main Server
// =============================

app.listen(PORT, () => {
  console.log(`Main app running on port ${PORT}`);
});

// =============================
// Logs
// =============================

backend.on("close", (code) => {
  console.log(`Backend exited with code ${code}`);
});

mlApi.on("close", (code) => {
  console.log(`ML API exited with code ${code}`);
});

chatbotApi.on("close", (code) => {
  console.log(`Chatbot API exited with code ${code}`);
});