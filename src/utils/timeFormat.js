export default function (time = new Date()) {
  const year = time.getFullYear().toString();
  const month = (time.getMonth() + 1).toString().padStart(2, 0);
  const day = time.getDate().toString().padStart(2, 0);
  const Hour = time.getHours().toString().padStart(2, 0);
  const minutes = time.getMinutes().toString().padStart(2, 0);
  const seconds = time.getSeconds().toString().padStart(2, 0);
  return `${year}-${month}-${day} ${Hour}:${minutes}:${seconds}`;
}
