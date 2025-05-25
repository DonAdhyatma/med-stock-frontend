import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';

import ListUser from './pages/user/ListUser'
import CreateUser from './pages/user/CreateUser'
import EditUser from './pages/user/EditUser'

import ListCustomer from './pages/customer/ListCustomer'
import CreateCustomer from './pages/customer/CreateCustomer'
import EditCustomer from './pages/customer/EditCustomer'

import ListSupplier from './pages/supplier/ListSupplier'
import CreateSupplier from './pages/supplier/CreateSupplier'
import EditSupplier from './pages/supplier/EditSupplier'

import ListObat from './pages/obat/ListObat'
import CreateObat from './pages/obat/CreateObat'
import EditObat from './pages/obat/EditObat'

import ListObatMasuk from './pages/obatmasuk/ListObatMasuk'
import CreateObatMasuk from './pages/obatmasuk/CreateObatMasuk'
import DetailObatMasuk from './pages/obatmasuk/DetailObatMasuk'
import CetakObatMasuk from './pages/obatmasuk/CetakObatMasuk'

import ListObatKeluar from './pages/obatkeluar/ListObatKeluar'
import CreateObatKeluar from './pages/obatkeluar/CreateObatKeluar'
import DetailObatKeluar from './pages/obatkeluar/DetailObatKeluar'
import CetakObatKeluar from './pages/obatkeluar/CetakObatKeluar'

import LaporanObatMasuk from './pages/laporan/LaporanObatMasuk'
import LaporanObatKeluar from './pages/laporan/LaporanObatKeluar'
import CetakAllObatMasuk from './pages/laporan/CetakAllObatMasuk'
import CetakAllObatKeluar from './pages/laporan/CetakAllObatKeluar'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login title="Apotek Murah Bung Tomo" description="Silakan Login" />}></Route>
        <Route path='/home' element={<Home />}></Route>

        {/* Data User */}
        <Route path='/user' element={<ListUser />}></Route>
        <Route path='/createUser' element={<CreateUser />}></Route>
        <Route path='/editUser/:id' element={<EditUser />}></Route>

        {/* Data Customer */}
        <Route path='/customer' element={<ListCustomer />}></Route>
        <Route path='/createCustomer' element={<CreateCustomer />}></Route>
        <Route path='/editCustomer/:id' element={<EditCustomer />}></Route>

        {/* Data Supplier */}
        <Route path='/supplier' element={<ListSupplier />}></Route>
        <Route path='/createSupplier' element={<CreateSupplier />}></Route>
        <Route path='/editSupplier/:id' element={<EditSupplier />}></Route>

        {/* Data Obat */}
        <Route path='/obat' element={<ListObat />}></Route>
        <Route path='/createObat' element={<CreateObat />}></Route>
        <Route path='/editObat/:id' element={<EditObat />}></Route>

        {/* Data Obat Masuk */}
        <Route path='/obatmasuk' element={<ListObatMasuk />}></Route>
        <Route path='/createObatMasuk' element={<CreateObatMasuk />}></Route>
        <Route path='/detailObatMasuk/:id' element={<DetailObatMasuk />}></Route>
        <Route path='/cetakObatMasuk/:id' element={<CetakObatMasuk />}></Route>

        {/* Data Obat Keluar */}
        <Route path='/obatkeluar' element={<ListObatKeluar />}></Route>
        <Route path='/createObatKeluar' element={<CreateObatKeluar />}></Route>
        <Route path='/detailObatKeluar/:id' element={<DetailObatKeluar />}></Route>
        <Route path='/cetakObatKeluar/:id' element={<CetakObatKeluar />}></Route>

        {/* Data Laporan */}
        <Route path='/laporanobatmasuk' element={<LaporanObatMasuk />}></Route>
        <Route path='/laporanobatkeluar' element={<LaporanObatKeluar />}></Route>
        <Route path='/cetakallobatmasuk' element={<CetakAllObatMasuk />}></Route>
        <Route path='/cetakallobatkeluar' element={<CetakAllObatKeluar />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
