export default function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}


export const inputDateFormat = (t) => {
    const tarih = new Date(t);
    const d = tarih.toLocaleDateString('fr-CA');
    return d;
}