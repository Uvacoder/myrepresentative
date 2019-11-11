import { colors } from './theme'

const Profile = ({ name, party, phones = [], photoUrl, urls = [] }) => (
  <article>
    <header>
      {photoUrl && <img src={photoUrl} />}
      <div>
        <h2>{name}</h2>
        <p>{party}</p>
      </div>
    </header>
    <section>
      {phones && <a href={`tel:${phones[0]}`}>{phones[0]}</a>}
      {urls
        ? urls.map(url => (
            <a href={url} target="_blank" key={url}>
              {url
                .replace('http://', '')
                .replace('https://', '')
                .replace('www.', '')}
            </a>
          ))
        : null}
    </section>
    <style jsx>{`
      article {
        background-color: ${colors.darkless};
        padding: 2rem;
        margin-top: 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.25);
      }
      header {
        display: flex;
        align-items: center;
      }
      h2 {
        margin: 0;
        font-weight: 800;
      }
      p {
        margin-top: 1rem;
        margin-bottom: 0;
      }
      header p {
        color: ${colors.muted};
        margin: 0;
      }
      img {
        width: 8rem;
        height: 8rem;
        object-fit: cover;
        object-position: top center;
        border-radius: 4rem;
        margin-right: 1rem;
      }
      a {
        background-color: ${colors.blue};
        color: ${colors.white};
        line-height: 1.5;
        padding: 0.25rem 0.75rem;
        display: inline-block;
        margin: 0;
        vertical-align: baseline;
        text-decoration: none;
        border-radius: 4px;
        cursor: pointer;
      }
      section {
        margin-top: 1rem;
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: auto;
      }
    `}</style>
  </article>
)

export default Profile
