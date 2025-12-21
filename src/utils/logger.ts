import type { IncomingMessage } from 'http';
import type { ServerResponse } from 'http';
import type pino from 'pino';

export function customLogLevel(
    req: IncomingMessage,
    res: ServerResponse,
    error?: Error,
): pino.LevelWithSilent {
    if (res.statusCode >= 500) return 'error';
    if (res.statusCode >= 400) return 'warn';

    return 'trace';
}
