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
            height={38}
            priority
          />
        </div>
        <div className="home-section">
          <a className="home-btn home-btn-dark" href="/form-maker">
            Form-maker
          </a>
        </div>
        <div className="home-section">
          <a
            className="home-btn home-btn-light"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="home-vercel-logo"
              style={{ filter: "invert(1)" }}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="home-btn home-btn-outline"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
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
