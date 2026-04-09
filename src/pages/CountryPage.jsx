import { useParams, useNavigate, Link } from 'react-router-dom'
import useCountry from '../hooks/useCountry'
import '../styles/App.css'

function CountryPage() {
  const { name } = useParams()
  const navigate = useNavigate()
  const { country, loading, error } = useCountry(name)

  if (loading) return <div className="country-page__status">Loading...</div>
  if (error) return <div className="country-page__status country-page__status--error">{error}</div>
  if (!country) return null

  const {
    flags,
    name: countryName,
    population,
    region,
    subregion,
    capital,
    tld,
    currencies,
    languages,
    borders,
  } = country

  const nativeName = countryName.nativeName
    ? Object.values(countryName.nativeName)[0].common
    : countryName.common

  const currencyNames = currencies
    ? Object.values(currencies)
        .map((c) => c.name)
        .join(', ')
    : 'N/A'

  const languageNames = languages ? Object.values(languages).join(', ') : 'N/A'

  return (
    <div className="country-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Back
      </button>

      <div className="country-details">
        <img src={flags.svg} alt={`${countryName.common} flag`} className="country-details__flag" />
        
        <div className="country-details__content">
          <h2 className="country-details__name">{countryName.common}</h2>
          
          <div className="country-details__grid">
            <div className="country-details__info">
              <p><span>Native Name:</span> {nativeName}</p>
              <p><span>Population:</span> {population.toLocaleString()}</p>
              <p><span>Region:</span> {region}</p>
              <p><span>Sub Region:</span> {subregion ?? 'N/A'}</p>
              <p><span>Capital:</span> {capital?.[0] ?? 'N/A'}</p>
            </div>
            
            <div className="country-details__info">
              <p><span>Top Level Domain:</span> {tld?.[0] ?? 'N/A'}</p>
              <p><span>Currencies:</span> {currencyNames}</p>
              <p><span>Languages:</span> {languageNames}</p>
            </div>
          </div>

          {borders && borders.length > 0 && (
            <div className="country-details__borders">
              <h3>Border Countries:</h3>
              <div className="border-links">
                {borders.map((border) => (
                  <Link key={border} to={`/country/${border}`} className="border-link">
                    {border}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CountryPage
