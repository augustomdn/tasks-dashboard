export function formatDate(dateString: string): string {
    if (!dateString) return "Data inválida";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Data inválida";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);

    return `${day}/${month}/${year}`;
}

export function formatDateTime(dateString: string): string {
  if (!dateString) return "Data inválida";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Data inválida";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

