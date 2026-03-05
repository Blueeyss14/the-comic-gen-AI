const ComicTitle = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans+Display:wght@400;700&family=Google+Sans:wght@300;400&display=swap');

        /* fallback if Google Sans Display not available */
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Outfit:wght@300;600;700&display=swap');

        .comic-title-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
          text-align: center;
          padding: 0 24px;
          position: relative;
          z-index: 10;
        }

        .comic-title-h1 {
          font-family: 'Outfit', 'Google Sans Display', sans-serif;
          font-size: clamp(2.8rem, 6vw, 5.5rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0;
          background: linear-gradient(
            120deg,
            #ffffff 0%,
            #64b4ff 30%,
            #a0dcf0 55%,
            #ffffff 70%,
            #64b4ff 85%,
            #ffffff 100%
          );
          background-size: 250% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
          filter: drop-shadow(0 0 32px rgba(100,180,255,0.25));
        }

        .comic-title-p {
          font-family: 'DM Sans', 'Google Sans', sans-serif;
          font-size: clamp(1rem, 2vw, 1.25rem);
          font-weight: 300;
          letter-spacing: 0.01em;
          line-height: 1.6;
          margin: 0;
          max-width: 520px;
          color: rgba(200, 220, 240, 0.75);
          animation: fadeUp 1s ease 0.3s both;
        }

        .comic-title-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          border-radius: 999px;
          border: 1px solid rgba(100, 180, 255, 0.3);
          background: rgba(100, 180, 255, 0.08);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 400;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(160, 220, 240, 0.9);
          animation: fadeUp 0.8s ease both;
          backdrop-filter: blur(8px);
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #64b4ff;
          box-shadow: 0 0 8px #64b4ff;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes shimmer {
          0%   { background-position: 0% center; }
          100% { background-position: 250% center; }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.7); }
        }
      `}</style>

      <div className="comic-title-wrap mb-40">
        <div className="comic-title-badge">
          <span className="badge-dot" />
          Powered by Qwen
        </div>

        <h1 className="comic-title-h1">
          The Comic<br />Gen-AI
        </h1>

        <p className="comic-title-p">
          Generate stunning comics from your imagination.
        </p>
      </div>
    </>
  );
};

export default ComicTitle;