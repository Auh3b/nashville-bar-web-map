export function scrollToId(id: string) {
  console.log(id);
  const el = document.getElementById(id);
  el?.scrollIntoView();
}
