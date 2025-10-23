export function createEvent<T>(title: string, data: T) {
  dispatchEvent(new CustomEvent(title, { detail: data }));
}
