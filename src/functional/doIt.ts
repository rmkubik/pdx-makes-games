export function doIt<T>(callback: () => T) {
  return callback();
}
