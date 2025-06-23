import Image from "next/image";

export default function Home() {
  return (
    <div className="home-container">
      <main className="home-main">
        <div className="home-header">
          <span className="home-title">Bryan&apos;s stuff</span>
          <Image
            className="home-logo"
            src="/instawhale.jpg"
            alt="Next.js logo"
            width={180}
            height={180}
            priority
          />
        </div>
        <div className="home-section">
          <a className="home-btn home-btn-light" href="/form-maker">
            Form-maker
          </a>
        </div>
        
      </main>
      <footer className="home-footer">
        <a
          className="home-footer-link"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
      </footer>
    </div>
  );
}
