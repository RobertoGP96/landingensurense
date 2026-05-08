/* global React, ReactDOM, CONTENT */
const { useState: useStateApp, useEffect: useEffectApp } = React;
const { TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakToggle, TweakColor, TweakSelect } = window;

function App() {
  const [t, setTweak] = useTweaks(window.__TWEAK_DEFAULTS);
  const lang = t.lang || "es";
  const setLang = (v) => setTweak("lang", v);
  const C = (window.CONTENT)[lang];

  // Apply theme to body
  useEffectApp(() => {
    document.body.dataset.theme = t.theme || "cream";
    document.documentElement.lang = lang;
  }, [t.theme, lang]);

  // Display font swap
  useEffectApp(() => {
    const fonts = {
      bricolage: '"Bricolage Grotesque", ui-sans-serif, system-ui, sans-serif',
      space: '"Space Grotesk", ui-sans-serif, system-ui, sans-serif',
      fraunces: '"Fraunces", Georgia, serif',
    };
    document.documentElement.style.setProperty("--display", fonts[t.displayFont] || fonts.bricolage);
  }, [t.displayFont]);

  return (
    <>
      <Topbar t={C} lang={lang} setLang={setLang} />
      <Header t={C} />
      <main>
        <Hero t={C} showEagle={t.showEagleMotif !== false} />
        <CarriersMarquee t={C} />
        <Intro t={C} />
        <Coverage t={C} />
        <Why t={C} showEagle={t.showEagleMotif !== false} />
        <Process t={C} />
        <Quote t={C} />
        <Testimonials t={C} />
        <Contact t={C} />
        <CtaBanner t={C} showEagle={t.showEagleMotif !== false} />
      </main>
      <Footer t={C} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Idioma · Language">
          <TweakRadio label="" value={lang} onChange={(v) => setLang(v)} options={[{ label: "Español", value: "es" }, { label: "English", value: "en" }]} />
        </TweakSection>
        <TweakSection label="Tema · Theme">
          <TweakRadio label="" value={t.theme} onChange={(v) => setTweak("theme", v)} options={[{ label: "Crema", value: "cream" }, { label: "Tinta", value: "ink" }, { label: "Cielo", value: "sky" }]} />
        </TweakSection>
        <TweakSection label="Tipografía display">
          <TweakRadio label="" value={t.displayFont} onChange={(v) => setTweak("displayFont", v)} options={[{ label: "Bricolage", value: "bricolage" }, { label: "Space", value: "space" }, { label: "Fraunces", value: "fraunces" }]} />
        </TweakSection>
        <TweakSection label="Águila como motivo">
          <TweakToggle label="Mostrar el águila" value={t.showEagleMotif !== false} onChange={(v) => setTweak("showEagleMotif", v)} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

// Add Space Grotesk + Fraunces lazily
const extraFonts = document.createElement("link");
extraFonts.rel = "stylesheet";
extraFonts.href = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&display=swap";
document.head.appendChild(extraFonts);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
