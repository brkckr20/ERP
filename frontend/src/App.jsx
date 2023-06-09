import { Switch, Route, useLocation } from 'react-router-dom'
import './App.css'
import { useEffect } from 'react';
import { dbGetir } from './pages/globalApi'
import Navbar from './components/Navbar'
import FirmaSabitleri from './pages/GenelBilgiler/FirmaSabitleri'
import FirmaKarti from './pages/Kartlar/FirmaKarti'
import UlkeKarti from './pages/Kartlar/UlkeKarti'
import MalzemeKartiTanimlamalari from './pages/MalzemeIslemleri/MalzemeKartiTanimlamalari'
import MalzemeGiris from './pages/MalzemeIslemleri/MalzemeGiris'
import MalzemeCikis from './pages/MalzemeIslemleri/MalzemeCikis'
import Footer from './components/Footer';
import BirimKodlama from './pages/Kodlama/BirimKodlama';
import Anasayfa from './pages/Anasayfa';
import Giris from './pages/Giris';
import MenuYetkilendirme from './pages/Menu/MenuYetkilendirme';

import ProtectedRoute from './pages/ProtectedRoute';
import MenuEkle from './pages/Menu/MenuEkle';
import AksesuarKarti from './pages/Kartlar/AksesuarKarti';
import AksesuarSatinAlma from './pages/SatinAlma/AksesuarSatinAlma';
import GorselRapor from './pages/Rapor/GorserRapor';
import Gorseller from './pages/Rapor/GorserRapor/Gorseller';

/* rapor */


function App() {

  const { pathname } = useLocation();

  useEffect(() => {
    dbGetir().then(data => localStorage.setItem("dbName", JSON.stringify(data.data[0])))
  }, [])

  if (pathname === "/giris") {
    return (
      <Switch>
        <Route exact path="/giris">
          <Giris />
        </Route>
      </Switch>
    )
  }


  return (
    <>
      <div className='h-full flex bg-gray-100'>
        <Navbar />
        <div className='bg-white w-full'>
          <Switch>
            /* kartlar */
            <ProtectedRoute exact path="/ulke-karti" component={UlkeKarti} />
            <ProtectedRoute exact path="/aksesuar-karti" component={AksesuarKarti} />
            <ProtectedRoute exact path="/firma-karti" component={FirmaKarti} />
            /* #kartlar */

            /* satin alma */
            <ProtectedRoute exact path="/aksesuar-satin-alma" component={AksesuarSatinAlma} />
            /* #satin alma */

            {/* rapor */}
            <ProtectedRoute exact path="/gorsel-rapor" component={GorselRapor} />
            <ProtectedRoute exact path="/gorsel-rapor/:id" component={Gorseller} />

            <ProtectedRoute exact path="/firma-sabitleri" component={FirmaSabitleri} />
            <ProtectedRoute exact path="/malzeme-karti-tanimlamalari" component={MalzemeKartiTanimlamalari} />
            <ProtectedRoute exact path="/malzeme-giris" component={MalzemeGiris} />
            <ProtectedRoute exact path="/malzeme-cikis" component={MalzemeCikis} />
            <ProtectedRoute exact path="/birim-kodlama" component={BirimKodlama} />
            <ProtectedRoute exact path="/menu-yetkilendirme" component={MenuYetkilendirme} />
            <ProtectedRoute exact path="/menu-ekle" component={MenuEkle} />
            <ProtectedRoute exact path="/" component={Anasayfa} />

          </Switch>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
