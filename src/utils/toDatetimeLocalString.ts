export default function toDatetimeLocalString(date: Date) {
  const local = new Date(date);
  local.setMinutes(local.getMinutes() - local.getTimezoneOffset()); // Ajusta a hora local

  return local.toISOString().slice(0, 16); // 'YYYY-MM-DDTHH:mm'
}