/* global React, ReactDOM, CONTENT */
const { useState, useEffect } = React;

// Helper: wrap state updates in View Transitions when supported
function withViewTransition(updateFn) {
  if (typeof document.startViewTransition !== "function") {
    updateFn();
    return;
  }
  document.startViewTransition(() => {
    ReactDOM.flushSync(updateFn);
  });
}

function App() {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("mcs_lang") || "es";
    } catch (e) {
      return "es";
    }
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem("mcs_lang", lang); } catch (e) {}
  }, [lang]);

  const handleSetLang = (newLang) => {
    if (newLang === lang) return;
    withViewTransition(() => setLang(newLang));
  };

  const C = window.CONTENT[lang];

  return (
    <>
      <Topbar t={C} lang={lang} setLang={handleSetLang} />
      <Header t={C} />
      <main>
        <Hero t={C} />
        <CarriersMarquee />
        <Intro t={C} />
        <Coverage t={C} />
        <Why t={C} />
        <Process t={C} />
        <Quote t={C} withTransition={withViewTransition} />
        <Testimonials t={C} withTransition={withViewTransition} />
        <Contact t={C} />
        <CtaBanner t={C} />
      </main>
      <Footer t={C} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
