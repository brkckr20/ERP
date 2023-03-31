import { fisIslemSil } from "./globalApi"

export const fisSil = async (depoAdi, id, basarili, kayitGetir) => {
    if (confirm("Silinecek emin misiniz\nBu işlem geri alınamaz")) {
        const { message } = await fisIslemSil(depoAdi, id);
        basarili(message);
        kayitGetir();
    }
}