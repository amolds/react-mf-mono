#!/usr/bin/env bash
set -euo pipefail

ports=(3000 3001 3002)
failed=0

if ! command -v lsof >/dev/null 2>&1; then
  printf 'lsof is required to find processes listening on the app ports.\n' >&2
  exit 1
fi

for port in "${ports[@]}"; do
  mapfile -t pids < <(lsof -tiTCP:"$port" -sTCP:LISTEN || true)

  if ((${#pids[@]} == 0)); then
    printf 'No listener on port %s.\n' "$port"
    continue
  fi

  if [[ "${DRY_RUN:-0}" == "1" ]]; then
    printf 'Would stop PID(s) %s on port %s.\n' "${pids[*]}" "$port"
    continue
  fi

  printf 'Stopping PID(s) %s on port %s.\n' "${pids[*]}" "$port"
  if ! kill -TERM "${pids[@]}"; then
    printf 'Could not stop every process on port %s.\n' "$port" >&2
    failed=1
  fi
done

exit "$failed"