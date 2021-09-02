import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import SefMagacinaPage from './pages/SefMagacinaPage';
import { Centrala, LagerLista, Magacin, Proizvod, SefMagacina } from './tipovi';
import { vratiListu } from './service/vratiListu';
import { obrisiSaServera } from './service/obrisi';
import { kreiraj } from './service/kreiraj';
import { izmeni } from './service/izmeni';
import LagerListaPage from './pages/LagerListaPage';
import HomePage from './pages/HomePage';

function App() {

  const [sefoviMagacina, setSefoviMagacina] = useState<SefMagacina[]>([]);
  const [magacini, setMagacini] = useState<Magacin[]>([]);
  const [lagerListe, setLagerListe] = useState<LagerLista[]>([])
  const [proizvodi, setProizvodi] = useState<Proizvod[]>([]);
  const [centrale, setCentrale] = useState<Centrala[]>([])
  const obrisiSefa = (id: number) => {
    obrisiSaServera('/sefmagacina', id).then(() => {
      setSefoviMagacina(prev => {
        return prev.filter(element => element.sifraSM !== id);
      })
    })
  }
  const izmeniSefa = (id: number, sef: Partial<SefMagacina>) => {
    izmeni('/sefmagacina', id, sef).then(() => {
      setSefoviMagacina(prev => {
        return prev.map(element => {
          if (element.sifraSM === id) {
            return { ...element, ...sef, magacin:sef.magacin };
          }
          if (element.magacin?.sifraMagacina === sef.magacin?.sifraMagacina) {
            element.magacin = undefined;
          }
          return element;
        })
      })
    })
  }
  const kreirajSefa = (sef: Partial<SefMagacina>) => {
    kreiraj('/sefmagacina', sef).then(idObject => {
      setSefoviMagacina(prev => {
        return [
          ...prev.map(element => {
            if (element.magacin?.sifraMagacina === sef.magacin?.sifraMagacina) {
              element.magacin = undefined;
            }
            return element;
          }),
          { ...sef as SefMagacina, sifraSM: idObject.sifraSM }];
      })
    })
  }
  const obrisiLagerListu = async (id?: number) => {
    if (!id) {
      return;
    }
    await obrisiSaServera('/lagerlista', id)
    setLagerListe(prev => {
      return prev.filter(element => element.sifraLL !== id);
    })
  }
  const kreirajLL = async (data: any) => {
    const ll = await kreiraj('/lagerlista', data);
    setLagerListe(prev => {
      return [...prev, ll];
    })
  }
  const izmeniLL = async (data: any, id?: number) => {
    if (!id) {
      return;
    }
    const ll = await izmeni('/lagerlista', id, data);
    setLagerListe(prev => {
      return prev.map(element => {
        if (element.sifraLL === id) {
          return ll;
        }
        return element;
      })
    })
  }
  useEffect(() => {
    vratiListu<SefMagacina[]>('/sefmagacina').then(sefovi => {
      setSefoviMagacina(sefovi);
    });
    vratiListu<Magacin[]>('/magacin').then(magacini => {
      setMagacini(magacini);
    })
    vratiListu<LagerLista[]>('/lagerlista').then(setLagerListe);
    vratiListu<Proizvod[]>('/proizvod').then(setProizvodi);
    vratiListu<Centrala[]>('/centrala').then(setCentrale);
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      
      <Switch>
        <Route path='/lagerlista' >
          <LagerListaPage kreirajLL={kreirajLL} izmeniLL={izmeniLL} obrisiLagerListu={obrisiLagerListu} sefoviMagacina={sefoviMagacina} centrale={centrale} lagerListe={lagerListe} proizvodi={proizvodi} />
        </Route>
        <Route path='/sefmagacina' >
          <SefMagacinaPage izmeniSefa={izmeniSefa} sefovi={sefoviMagacina} kreirajSefa={kreirajSefa} magacini={magacini} obrisiSefa={obrisiSefa} />
        </Route>
        <Route path='/'> 
         <HomePage/>
        </Route>
      </Switch>
      
    </BrowserRouter>
  );
}

export default App;
