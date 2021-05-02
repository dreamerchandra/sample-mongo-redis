/* eslint-disable react/prefer-stateless-function */
import React, { useState } from 'react'
import { api } from '../../api'
import { useServerData } from '../../state/serverDataContext'
import style from './aq-index.module.scss'

const AqIndex = () => {
  const airQuality = useServerData((data) => {
    return data.airQuality || []
  })
  const [value, setValue] = useState(0)
  return (
    <div className={style.formWrapper}>
      <form>
        <label htmlFor="pollutant">
          Select a Pollutant
          <select name="pollutant">
            {airQuality.map(({ id, name }) => (
              <option value={name} kye={id}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="aqi">
          Enter the AQI
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            type="number"
          />
        </label>
      </form>
    </div>
  )
}

AqIndex.fetchData = () => {
  return api.airQuality
    .getAllQuality()
    .then((airQuality) => ({
      airQuality,
    }))
    .catch(console.error)
}

export default AqIndex
