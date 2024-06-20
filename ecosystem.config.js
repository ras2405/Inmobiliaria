module.exports = {
  apps: [
    {
      name: "Login",
      script: "./Login/src/sessionApp.ts", // Cambia app.js al archivo de entrada de tu proyecto
      cwd: "./Login",
      instances: 4,
      interpreter: "ts-node",
      max_memory_restart: "512M",
      vizion: false,
    },
    {
      name: "Main",
      script: "./Main/src/app.ts",
      cwd: "./Main",
      instances: 4,
      interpreter: "ts-node",
      max_memory_restart: "512M",
      vizion: false,
    },
    {
      name: "Payment",
      script: "./Payment/src/paymentApp.ts",
      cwd: "./Payment",
      instances: 4,
      interpreter: "ts-node",
      max_memory_restart: "512M",
      vizion: false,
    },
    {
      name: "Sensors",
      script: "./Sensors/src/sensorsApp.ts",
      cwd: "./Sensors",
      instances: 4,
      interpreter: "ts-node",
      max_memory_restart: "512M",
      vizion: false,
    }
  ]
};
