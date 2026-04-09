import { useState, useEffect } from 'react'

export default function useCountry(code) {
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!code) return

    setLoading(true)
    setError(null)

    fetch(`https://restcountries.com/v3.1/alpha/${code}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Country not found.')
        }
        return res.json()
      })
      .then((data) => {
        // alpha endpoint returns an array in some cases, or a single object
        // depending on the API version. V3.1 returns an array.
        setCountry(Array.isArray(data) ? data[0] : data)
        setError(null)
      })
      .catch((err) => {
        setCountry(null)
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [code])

  return { country, loading, error }
}
