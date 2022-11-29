import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <ul>
        <li>
          <h4>Contact Me:</h4>
          <a href='https://github.com/emanuelefavero'>Github</a>
          <a href='https://www.linkedin.com/in/emanuele-favero/'>Linkedin</a>
        </li>
        <li>
          <a href='https://emanuelefavero.com/'>Website</a>
          <a href='mailto:info@emanuelefavero.com'>Email me</a>
        </li>
      </ul>
      <p>Emanuele Favero @ {new Date().getFullYear()}</p>
    </footer>
  )
}

export default Footer
