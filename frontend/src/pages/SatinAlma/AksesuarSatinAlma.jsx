import React from 'react'
import ProcessButtonGroup from '../../components/ProcessButton/ProcessButtonGroup'
import ProcessButton from '../../components/ProcessButton/ProcessButton'
import LabelInput from '../../components/Inputs/LabelInput';

const AksesuarSatinAlma = () => {
    return (
        <div className='flex flex-col h-full'>
            <div className='h-[200px]'>
                <ProcessButtonGroup>
                    <ProcessButton type="button" icon='new' title="Yeni" />
                    <ProcessButton type="button" title="Kaydet" />
                    <ProcessButton type="button" icon='print' title="Yazdır" size={25} />
                    <ProcessButton type="button" icon='arrowBack' title="Geri" size={25} />
                    <ProcessButton type="button" icon='arrowNext' title="İleri" size={25} />
                    <ProcessButton type="button" icon='list' title="Liste" size={25} />
                    <ProcessButton type="button" icon='giveUp' title="Vazgeç" size={25} />
                    <ProcessButton type="button" icon='trash' title="Sil" size={25} />
                </ProcessButtonGroup>
                <div className="flex flex-row flex-wrap justify-start gap-x-2 bg-gray-200 h-full">
                    <div className="w-1/5">
                        <LabelInput label="Tarih :" type="date" />
                        <LabelInput label="Termin :" type="date" />
                        <LabelInput label="Firma Kodu :" filteredInput={true} />
                        <LabelInput label="Firma Adı :" />
                        <LabelInput label="Vade :" />
                    </div>
                    <div className="w-1/5">
                        <LabelInput label="Sevk Eden :" />
                        <LabelInput label="Teslim Alan :" />
                        <LabelInput label="Talimat Onay :" type="checkbox" />
                        <LabelInput label="Onaylayan :" />
                        <LabelInput label="Onay Tarihi :" />
                    </div>
                    <div className="w-1/5">
                        <LabelInput label="Talimat No :" />
                        <LabelInput label="İşlem Cinsi :" />
                        <LabelInput label="Kayıt No :" />
                    </div>
                    <div className="w-1/5 flex gap-x-2">
                        <label className='inline-block max-w-[200px] w-full'>Açıklama : </label>
                        <textarea className='pl-1 outline-none' />
                    </div>
                </div>
            </div>
            <div className='flex-1 bg-pink-100'>
                <table className='overflow-x-scroll'>
                    <thead>
                        <tr >
                            <td>Sil</td>
                            <td className='w-[320px]'>Aks. Kodu</td>
                            <td className='w-[320px]'>Aks. Cinsi</td>
                            <td className='w-[320px]'>Aks. Ebat</td>
                            <td className='w-[320px]'>Aks. Grup</td>
                            <td className='w-[320px]'>Aks. Renk</td>
                            <td className='w-[320px]'>Ebat / Beden</td>
                            <td className='w-[320px]'>Özellik 1</td>
                            <td className='w-[320px]'>Özellik 2</td>
                            <td className='w-[320px]'>Özellik 3</td>
                            <td className='w-[320px]'>Özellik 4</td>
                            <td className='w-[320px]'>Sip. No</td>
                            <td className='w-[320px]'>G. Miktar</td>
                            <td className='w-[320px]'>Birim</td>
                            <td className='w-[320px]'>G. Fiyat</td>
                            <td className='w-[320px]'>G. Döviz</td>
                            <td className='w-[320px]'>Termin Tarihi</td>
                            <td className='w-[320px]'>Kalem Açıklama</td>
                            <td className='w-[320px]'>Kalem Kayıt No</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td className='w-[120px]'>SATINALMA</td>
                            <td className='w-[120px]'>stc111</td>
                            <td className='w-[120px]'>GENEL</td>
                            <td className='w-[120px]'>STICKER</td>
                            <td className='w-[120px]'></td>
                            <td className='w-[120px]'>20-12</td>
                            <td className='w-[120px]'>3'LÜ BİTİŞİK</td>
                            <td className='w-[120px]'>KUŞE</td>
                            <td className='w-[120px]'>ÖZ2</td>
                            <td className='w-[120px]'>ÖZ3</td>
                            <td className='w-[120px]'>SİPNO</td>
                            <td className='w-[120px]'>80000</td>
                            <td className='w-[120px]'>AD</td>
                            <td className='w-[120px]'>0,36</td>
                            <td className='w-[120px]'>TL</td>
                            <td className='w-[120px]'>TER.Tarih</td>
                            <td className='w-[120px]'>KALEM AÇIKLAMA</td>
                            <td className='w-[120px]'>KALEM KAYIT NO</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='flex-1 bg-green-200'>havuz kısmı</div>
        </div>
    )
}

export default AksesuarSatinAlma