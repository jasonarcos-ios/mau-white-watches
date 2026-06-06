"use client";

export default function WatchModel() {
  return (
    <div className="relative w-72 h-72 md:w-96 md:h-96 watch-container mx-auto select-none">
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full bg-[#C9A84C] opacity-5 blur-3xl scale-125 glow-pulse" />

      {/* Watch body - floating 3D */}
      <div className="absolute inset-0 watch-float">
        {/* Case */}
        <div className="absolute inset-[12%] rounded-full"
          style={{
            background: "radial-gradient(ellipse at 35% 30%, #2a2a2a 0%, #111 40%, #0a0a0a 100%)",
            boxShadow: "0 0 0 3px #C9A84C, 0 0 0 6px #1a1a1a, 0 0 0 9px #C9A84C44, 0 30px 80px rgba(0,0,0,0.8), 0 10px 40px rgba(201,168,76,0.15)",
          }}
        >
          {/* Inner bezel */}
          <div className="absolute inset-[8%] rounded-full"
            style={{
              background: "radial-gradient(ellipse at 40% 35%, #1a1a1a 0%, #0d0d0d 100%)",
              border: "1px solid rgba(201,168,76,0.3)",
            }}
          >
            {/* Dial */}
            <div className="absolute inset-[5%] rounded-full overflow-hidden"
              style={{
                background: "radial-gradient(ellipse at 50% 30%, #141414 0%, #080808 100%)",
              }}
            >
              {/* Hour markers */}
              {Array.from({ length: 12 }, (_, i) => {
                const angle = (i * 30) * (Math.PI / 180);
                const isQuarter = i % 3 === 0;
                const r = 42;
                const x = 50 + r * Math.sin(angle);
                const y = 50 - r * Math.cos(angle);
                return (
                  <div
                    key={i}
                    className="absolute"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div
                      style={{
                        width: isQuarter ? "3px" : "1.5px",
                        height: isQuarter ? "10px" : "6px",
                        background: isQuarter
                          ? "linear-gradient(180deg, #E2C47A, #C9A84C)"
                          : "rgba(201,168,76,0.6)",
                        transform: `rotate(${i * 30}deg)`,
                        borderRadius: "1px",
                        boxShadow: isQuarter ? "0 0 4px rgba(201,168,76,0.5)" : "none",
                      }}
                    />
                  </div>
                );
              })}

              {/* Hour hand */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="absolute origin-bottom"
                  style={{
                    width: "2px",
                    height: "28%",
                    bottom: "50%",
                    left: "calc(50% - 1px)",
                    background: "linear-gradient(180deg, #E2C47A, #C9A84C)",
                    transform: "rotate(-60deg)",
                    borderRadius: "2px 2px 0 0",
                    boxShadow: "0 0 6px rgba(201,168,76,0.6)",
                  }}
                />
                {/* Minute hand */}
                <div
                  className="absolute origin-bottom"
                  style={{
                    width: "1.5px",
                    height: "36%",
                    bottom: "50%",
                    left: "calc(50% - 0.75px)",
                    background: "linear-gradient(180deg, #fff, #ccc)",
                    transform: "rotate(110deg)",
                    borderRadius: "2px 2px 0 0",
                  }}
                />
                {/* Seconds hand */}
                <div
                  className="absolute origin-bottom"
                  style={{
                    width: "1px",
                    height: "40%",
                    bottom: "50%",
                    left: "calc(50% - 0.5px)",
                    background: "#C9A84C",
                    transform: "rotate(200deg)",
                    borderRadius: "2px",
                  }}
                />
                {/* Center cap */}
                <div
                  className="absolute w-3 h-3 rounded-full z-10"
                  style={{
                    background: "radial-gradient(circle, #E2C47A, #9A7A2E)",
                    boxShadow: "0 0 6px rgba(201,168,76,0.8)",
                    top: "calc(50% - 6px)",
                    left: "calc(50% - 6px)",
                  }}
                />
              </div>

              {/* Brand text */}
              <div className="absolute w-full text-center" style={{ top: "30%", fontSize: "7px", letterSpacing: "0.2em" }}>
                <span style={{ color: "#C9A84C", fontFamily: "var(--font-playfair)" }}>MAU WHITE</span>
              </div>
              <div className="absolute w-full text-center" style={{ top: "62%", fontSize: "4.5px", letterSpacing: "0.15em", color: "rgba(201,168,76,0.5)" }}>
                SWISS MADE
              </div>
            </div>
          </div>
        </div>

        {/* Crown */}
        <div
          className="absolute"
          style={{
            right: "7%",
            top: "50%",
            transform: "translateY(-50%)",
            width: "6px",
            height: "18px",
            background: "linear-gradient(180deg, #C9A84C, #9A7A2E)",
            borderRadius: "3px",
            boxShadow: "2px 0 8px rgba(0,0,0,0.5)",
          }}
        />

        {/* Lugs */}
        {[
          { top: "9%", left: "28%", rotate: "-30deg", width: "16px", height: "10px" },
          { top: "9%", right: "28%", rotate: "30deg", width: "16px", height: "10px" },
          { bottom: "9%", left: "28%", rotate: "30deg", width: "16px", height: "10px" },
          { bottom: "9%", right: "28%", rotate: "-30deg", width: "16px", height: "10px" },
        ].map((lug, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              ...lug,
              background: "linear-gradient(135deg, #2a2a2a, #111)",
              borderRadius: "3px",
              border: "1px solid rgba(201,168,76,0.2)",
            }}
          />
        ))}

        {/* Strap top */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: "-22%",
            width: "22%",
            height: "30%",
            background: "linear-gradient(180deg, #1a1a1a, #111)",
            borderRadius: "4px 4px 0 0",
            border: "1px solid rgba(201,168,76,0.1)",
          }}
        >
          {[20, 40, 60, 80].map((pct) => (
            <div key={pct} className="absolute w-full h-px" style={{ top: `${pct}%`, background: "rgba(201,168,76,0.08)" }} />
          ))}
        </div>

        {/* Strap bottom */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            bottom: "-22%",
            width: "22%",
            height: "30%",
            background: "linear-gradient(180deg, #111, #1a1a1a)",
            borderRadius: "0 0 4px 4px",
            border: "1px solid rgba(201,168,76,0.1)",
          }}
        >
          {[20, 40, 60, 80].map((pct) => (
            <div key={pct} className="absolute w-full h-px" style={{ top: `${pct}%`, background: "rgba(201,168,76,0.08)" }} />
          ))}
        </div>
      </div>

      {/* Reflection */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: "-40px",
          width: "60%",
          height: "40px",
          background: "radial-gradient(ellipse, rgba(201,168,76,0.12) 0%, transparent 70%)",
          filter: "blur(10px)",
        }}
      />
    </div>
  );
}
