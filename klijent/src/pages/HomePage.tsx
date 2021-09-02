
import { Button, Checkbox, Grid, Input } from 'semantic-ui-react'
import '../Home.css';
export default function Home() {
    return (
        
        <Grid centered columns='16' padded>
           
            <Grid.Row >
            <Grid.Column width='8'>
                
           <div className = "mainDiv">
           <h1>Forever Living Products</h1>
               <div>
               Forever Living Products (FLP) je međunarodna grupa kompanija koja proizvodi i 
širom sveta stavlja u promet ekskluzivne dodatke ishrani i kozmetičke proizvode 
zahvaljujući svom jedinstvenom konceptu kojim se podstiče i potpomaže korišćenje i 
maloprodaja njenih proizvoda preko nezavisnih poslovnih saradnika. Ovaj rad se bazira
na njihovoj kompaniji koja se nalazi na teritoriji Republike Srbije. Njihovo poslovanje 
obuhvata četiri glavna procesa: nabavku, skladištenje, upravljanje poslovanjem i 
prodaju od čega će se u ovom radu obrađivati nabavka i skladištenje.
               </div>
          
           </div> 

            </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}