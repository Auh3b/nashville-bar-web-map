export function scrollToId(id: string) {
  const el = document.getElementById(id);
  el?.scrollIntoView();
}
