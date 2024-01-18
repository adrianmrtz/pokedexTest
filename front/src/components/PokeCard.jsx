import jsPDF from "jspdf"
import { getPokemonInfo } from "../services/getPokemonInfo"
import { types } from "./types"
import { toast } from "react-toastify"

export function PokeCard ({ poke }) {
  
  const handlePrintPokemon = (name) => {
    const pdf = new jsPDF()

    getPokemonInfo(name).then(pokemon => {
      if(pokemon.sprites.front_default !== null) {
        pdf.addImage(pokemon.sprites.front_default, 'PNG', 10, 10, 96, 96)
      }
      
      if (pokemon.sprites.other['official-artwork'].front_default !== null) {
        pdf.addImage(pokemon.sprites.other['official-artwork'].front_default, 'PNG', 96, 10, 96, 96)
      }
      
      pdf.text(pokemon.name.toUpperCase(), 10, 120)
      pdf.text(`#${pokemon.id}`, 10, 130)
      
      const primaryType = pokemon.types[0].type.name.toUpperCase();
      pdf.text(`Primary type: ${primaryType}`, 10, 140);

      if (pokemon.types[1]) {
        const secondaryType = pokemon.types[1].type.name.toUpperCase();
        pdf.text(`Secondary type: ${secondaryType}`, 10, 150);
      }

      pdf.text(`Base experience: ${pokemon.base_experience}`, 10, 160);
      pdf.text(`Height: ${pokemon.height}`, 10, 170);

      pdf.text('Abilities:', 10, 180);
      pokemon.abilities.forEach((ability, index) => {
        pdf.text(`${index + 1}. ${ability.ability.name.toUpperCase()}`, 15, 190 + index * 10);
      });

      pdf.save(`${pokemon.name}.pdf`)

      toast('PDF Generado correctamente')
    }).catch(error => {
      console.log(error)
      toast.error('Ha ocurrido un error al imprimir.')
    })
  }

  function getPokemonImage(sprites) {
    return sprites.front_default 
    ?? sprites.other['official-artwork'].front_default 
    ?? sprites.other.home.front_default
  }

  return (
    <div className="card card-body border-primary">
        <h5>#{poke.id} {poke.name}</h5>
        <button className="btn btn-primary w-50" onClick={() => handlePrintPokemon(poke.name)}>PDF</button>
        <img 
            src={getPokemonImage(poke.sprites)} 
            alt={poke.name} 
            style={{imageRendering: 'pixelated'}}
        />


        {poke.types.map( type => (
          <div key={type.type.name + "" + poke.id} className='badge my-1' style={{backgroundColor: types[type.type.name]}}>
                <h5>{type.type.name}</h5>
          </div>
        ))}
    </div>
  )
}
