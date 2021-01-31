import { useState } from 'react'
import Head from 'next/head'
import Profile from '../components/profile'
import { colors } from '../components/theme'

export default () => {
  const [address, setAddress] = useState('')
  const [rep, setRep] = useState(null)
  let value = <div />

  const fetchRep = async () => {
    const res = await fetch(`/api/rep?address=${encodeURIComponent(address)}`)
    const data = await res.json()
    setRep(data)
  }
  const onSubmit = e => {
    e.preventDefault()
    value = <p>Loading…</p>
    fetchRep()
  }
  const onChange = e => {
    setAddress(e.target.value)
  }

  if (rep) {
    value = <Profile {...rep} />
  }

  return (
    <main>
      <Head>
        <title>Find Your Rep</title>
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:site" content="@lachlanjc" />
        <meta
          property="twitter:description"
          content="Find and contact your Congressional Representative."
        />
        <meta property="og:title" content="Find Your Rep" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://usrep.vercel.app/" />
        <meta
          property="description"
          content="Find and contact your Congressional Representative."
        />
      </Head>
      <h1>Find Your Representative</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="address">Home address</label>
          <input type="text" name="address" onChange={onChange} />
        </div>
        <input type="submit" onClick={onSubmit} />
      </form>
      {value}
      <footer>
        Made by <a href="https://lachlanjc.com">@lachlanjc</a> on{' '}
        <a href="https://glitch.com/~usrep">Glitch</a>
      </footer>
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        body {
          background-color: ${colors.dark};
          color: ${colors.white};
          font-family: ui-rounded, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
          line-height: 1.66;
          margin: 0;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
      `}</style>
      <style jsx>{`
        main {
          padding: 2rem 1rem;
          width: 100%;
          margin: auto;
          max-width: 48rem;
        }
        h1 {
          font-weight: 800;
          font-size: 2rem;
          margin-top: 0;
          margin-bottom: 1rem;
          line-height: 1;
        }
        form {
          display: grid;
          grid-gap: 0.5rem;
          grid-template-columns: 1fr auto;
          align-items: end;
        }
        form label {
          display: block;
        }
        form input {
          appearance: none;
          background-color: ${colors.darkless};
          border-radius: 4px;
          border: none;
          display: block;
          font-family: inherit;
          font-size: 1.25rem;
          line-height: 1.5;
          color: inherit;
          outline: 0;
          width: 100%;
          padding: 0.25rem 0.75rem;
        }
        form input[type='submit'] {
          background: ${colors.red};
          font-weight: bold;
        }
        footer {
          font-size: 0.875rem;
          color: ${colors.muted};
          margin-top: 4rem;
        }
        footer a {
          color: ${colors.smoke};
        }
        @media (min-width: 32em) {
          main {
            padding: 4rem 1rem;
          }
          h1 {
            font-size: 4rem;
            margin-bottom: 2rem;
          }
        }
      `}</style>
    </main>
  )
}
