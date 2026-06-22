/* ============================================================================
   lib/result.ts — Result type + ServiceError discriminated union
   Source: Architecture Plan v1.1 §19.4 (consolidated error handling)
   ============================================================================ */

export type ServiceError =
  | { kind: "network"; message: string; retryable: true }
  | { kind: "server"; status: number; message: string; retryable: true }
  | { kind: "client"; status: number; message: string; retryable: false }
  | { kind: "not-found"; message: string; retryable: false }
  | { kind: "validation"; message: string; fields: Record<string, string>; retryable: false };

export type Result<T, E = ServiceError> =
  | { status: "ok"; data: T }
  | { status: "error"; error: E };

export function ok<T>(data: T): Result<T, never> {
  return { status: "ok", data };
}

export function err<E extends ServiceError>(error: E): Result<never, E> {
  return { status: "error", error };
}

export function isOk<T, E>(result: Result<T, E>): result is { status: "ok"; data: T } {
  return result.status === "ok";
}

export function isErr<T, E>(result: Result<T, E>): result is { status: "error"; error: E } {
  return result.status === "error";
}

/** Exponential backoff with jitter: 500ms, 1.2s, 3s, then give up */
export function getBackoffDelay(attempt: number): number {
  const base = [500, 1200, 3000];
  if (attempt >= base.length) return -1;
  const jitter = Math.random() * 200;
  return base[attempt] + jitter;
}
