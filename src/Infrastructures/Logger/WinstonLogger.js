class Logger {
  info(message, meta = undefined) {
    if (meta) {
      console.log(`[INFO] ${message}`, meta);
      return;
    }

    console.log(`[INFO] ${message}`);
  }

  warn(message, meta = undefined) {
    if (meta) {
      console.warn(`[WARN] ${message}`, meta);
      return;
    }

    console.warn(`[WARN] ${message}`);
  }

  error(message, meta = undefined) {
    if (meta) {
      console.error(`[ERROR] ${message}`, meta);
      return;
    }

    console.error(`[ERROR] ${message}`);
  }
}

const logger = new Logger();

export default logger;
