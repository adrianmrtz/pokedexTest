import { types } from "./types"

export function SelectTipo( { name, id, selectedType }) {
  return (
    <select defaultValue={selectedType} className="form-control" name={name} id={id}>
      {
        Object.entries(types).map(([type, color]) => (
          <option 
            value={ type } 
            key={ type }
            style={{ backgroundColor:color, color:"white" }}
            >
              { type }
            </option>
          ))
      }
    </select>
  )
}
