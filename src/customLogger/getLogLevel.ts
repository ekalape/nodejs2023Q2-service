export function getLogLevel(lvl: string) {
  switch (lvl) {
    case '0':
      return ['log', 'error'];
    case '1':
      return ['log', 'error', 'warn'];
    case '2':
      return ['log', 'error', 'warn', 'debug'];
    case '3':
      return ['log', 'error', 'warn', 'debug', 'verbose'];
    default:
      return ['log', 'error', 'warn', 'debug', 'verbose'];
  }
}
