export function createEvent(title: string, data: any) {
  dispatchEvent(new CustomEvent(title, { detail: data }));
}
