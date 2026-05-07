import React from "react";
import { createRoot } from "react-dom/client";

const roadmapSteps = [
  {
    id: "orientacja",
    title: "1. Złap kierunek",
    subtitle: "poznaj rynek i wybierz rolę startową",
    summary:
      "Zobacz, jakie stanowiska fizyczne i operacyjne są realnie dostępne w regionie, czego oczekują pracodawcy i od czego warto zacząć.",
    checklist: [
      "porównaj 3-4 role startowe w swoim mieście",
      "wybierz jedną ścieżkę główną i jedną zapasową",
      "sprawdź, jakie kursy i uprawnienia dają najszybszy start"
    ],
    tags: ["analiza rynku", "wybór ścieżki", "plan 30 dni"]
  },
  {
    id: "kompetencje",
    title: "2. Zbuduj podstawy",
    subtitle: "programy szkoleniowe i kompetencyjne",
    summary:
      "Połącz szybkie szkolenie techniczne z ćwiczeniem kompetencji miękkich: odpowiedzialności, pracy w rytmie zmiany i współpracy zespołowej.",
    checklist: [
      "uzupełnij krótki kurs branżowy",
      "przejdź przez moduł komunikacji i organizacji pracy",
      "zbierz pierwsze potwierdzenia umiejętności i obecności"
    ],
    tags: ["szkolenia", "kompetencje", "mikrocertyfikaty"]
  },
  {
    id: "networking",
    title: "3. Poznaj ludzi",
    subtitle: "mentorzy, społeczność i wydarzenia",
    summary:
      "Networking nie musi oznaczać wielkich konferencji. Wystarczy regularny kontakt z ludźmi, którzy już pracują i mogą polecić kolejny krok.",
    checklist: [
      "weź udział w spotkaniu społecznościowym",
      "porozmawiaj z mentorem lub liderem zmiany",
      "zbuduj prosty profil z projektami i gotowością do pracy"
    ],
    tags: ["społeczność", "spotkania", "mentoring"]
  },
  {
    id: "praca",
    title: "4. Wejdź do pracy",
    subtitle: "z projektu do pierwszej oferty",
    summary:
      "Pokaż gotowość przez mini-projekty i aplikuj do ról, które mają prosty onboarding. Liczy się konsekwencja, obecność i dopasowanie do realnych zmian pracy.",
    checklist: [
      "uzupełnij 2 praktyczne projekty lub zadania próbne",
      "aplikuj do ofert z jasnym wdrożeniem",
      "zadbaj o rozmowę pod kątem dyspozycyjności i motywacji"
    ],
    tags: ["portfolio projektów", "oferty fizyczne", "wdrożenie"]
  }
];

const programCollections = [
  {
    id: "szkoleniowe",
    label: "Programy szkoleniowe",
    description: "Szybkie ścieżki wejścia do pracy operacyjnej i fizycznej.",
    programs: [
      {
        title: "Start na magazynie",
        type: "Operacyjny",
        length: "3 tygodnie",
        mode: "Warsztaty + shadowing",
        summary: "Bezpieczeństwo, podstawy kompletacji, praca ze skanerem i rytm zmiany."
      },
      {
        title: "Produkcja bez stresu",
        type: "Wdrożeniowy",
        length: "2 tygodnie",
        mode: "Ćwiczenia stanowiskowe",
        summary: "Czytanie prostych instrukcji, jakość, tempo pracy i zgłaszanie problemów."
      },
      {
        title: "Logistyka pierwszego kroku",
        type: "Branżowy",
        length: "4 tygodnie",
        mode: "Projekt + praktyka",
        summary: "Podstawy przepływu materiału, oznaczenia, organizacja stref i odpowiedzialność."
      }
    ]
  },
  {
    id: "kompetencyjne",
    label: "Programy kompetencyjne",
    description: "Umiejętności miękkie potrzebne do utrzymania pierwszej pracy.",
    programs: [
      {
        title: "Punktualność i odpowiedzialność",
        type: "Nawykowy",
        length: "5 spotkań",
        mode: "Coaching grupowy",
        summary: "Praca z rytmem tygodnia, komunikowaniem nieobecności i planowaniem dojazdów."
      },
      {
        title: "Komunikacja na zmianie",
        type: "Zespołowy",
        length: "4 spotkania",
        mode: "Symulacje",
        summary: "Jak prosto zadawać pytania, zgłaszać błędy i współpracować z liderem."
      },
      {
        title: "Od projektu do zatrudnienia",
        type: "Przejściowy",
        length: "6 tygodni",
        mode: "Mentoring + portfolio",
        summary: "Domknięcie mini-projektu, opis efektu i przygotowanie do pierwszej rozmowy."
      }
    ]
  }
];

const roleContent = {
  parent: {
    title: "Tryb rodzica",
    items: [
      "Podgląd ścieżek szkoleniowych z naciskiem na bezpieczeństwo i stabilne wdrożenie.",
      "Materiały do rozmów wspierających ucznia przed wejściem na rynek pracy."
    ]
  },
  student: {
    title: "Tryb ucznia",
    items: [
      "Rekomendowane programy startowe i zadania praktyczne do portfolio.",
      "Skróty do wydarzeń networkingowych oraz ofert pierwszej pracy."
    ]
  }
};

function LandingRoadmap() {
  const [activeStepId, setActiveStepId] = React.useState(roadmapSteps[0].id);
  const activeStep = roadmapSteps.find((step) => step.id === activeStepId) ?? roadmapSteps[0];

  return (
    <div className="roadmap-shell">
      <div className="roadmap-grid">
        <div className="roadmap-steps">
          {roadmapSteps.map((step) => (
            <button
              key={step.id}
              type="button"
              className={`step-chip${step.id === activeStep.id ? " active" : ""}`}
              onClick={() => setActiveStepId(step.id)}
            >
              <strong>{step.title}</strong>
              <span>{step.subtitle}</span>
            </button>
          ))}
        </div>
        <div className="roadmap-copy">
          <span className="badge-soft">Aktywny etap</span>
          <h3 className="mt-3">{activeStep.title}</h3>
          <p className="mt-3">{activeStep.summary}</p>
          <div className="tag-list">
            {activeStep.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <ul className="roadmap-checklist">
            {activeStep.checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ProgramsRepository() {
  const [activeCollectionId, setActiveCollectionId] = React.useState(programCollections[0].id);
  const activeCollection =
    programCollections.find((collection) => collection.id === activeCollectionId) ?? programCollections[0];

  return (
    <div className="programs-shell">
      <div className="programs-grid">
        <div className="filter-pills">
          {programCollections.map((collection) => (
            <button
              key={collection.id}
              type="button"
              className={`filter-pill${collection.id === activeCollection.id ? " active" : ""}`}
              onClick={() => setActiveCollectionId(collection.id)}
            >
              <strong>{collection.label}</strong>
              <span>{collection.description}</span>
            </button>
          ))}
        </div>
        <div>
          <div className="programs-list">
            {activeCollection.programs.map((program) => (
              <article key={program.title} className="program-card">
                <span className="badge-soft">{program.type}</span>
                <h3 className="mt-3">{program.title}</h3>
                <p className="mt-2 mb-0">{program.summary}</p>
                <div className="program-meta">
                  <span>{program.length}</span>
                  <span>{program.mode}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

async function createPkcePair() {
  const bytes = new Uint8Array(32);
  window.crypto.getRandomValues(bytes);
  const verifier = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");

  const data = new TextEncoder().encode(verifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  const challengeBytes = new Uint8Array(digest);
  const challenge = btoa(String.fromCharCode(...challengeBytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return { verifier, challenge };
}

async function postJson(url, payload) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Wystąpił błąd żądania." }));
    throw new Error(error.message ?? "Wystąpił błąd żądania.");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

function AuthWidget() {
  const [mode, setMode] = React.useState("register");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");
  const [role, setRole] = React.useState("student");
  const [profile, setProfile] = React.useState(null);
  const [error, setError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const loadProfile = React.useCallback(async () => {
    const response = await fetch("/api/auth/me");
    const data = await response.json();
    setProfile(data.isAuthenticated ? data : null);
  }, []);

  React.useEffect(() => {
    loadProfile().catch(() => setProfile(null));
  }, [loadProfile]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const { verifier, challenge } = await createPkcePair();
      const challengeResponse = await postJson("/api/auth/pkce/challenge", {
        codeChallenge: challenge,
        codeChallengeMethod: "S256"
      });

      const payload = {
        email,
        password,
        challengeToken: challengeResponse.challengeToken,
        codeVerifier: verifier
      };

      if (mode === "register") {
        payload.displayName = displayName;
        payload.role = role;
      }

      await postJson(`/api/auth/${mode}`, payload);
      await loadProfile();
      setPassword("");
    } catch (submissionError) {
      setError(submissionError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleLogout() {
    await postJson("/api/auth/logout", {});
    setProfile(null);
  }

  if (profile) {
    const content = roleContent[profile.role] ?? roleContent.student;
    return (
      <div className="glass-card">
        <p className="card-kicker">Konto aktywne</p>
        <h3>Witaj, {profile.displayName}</h3>
        <p className="text-secondary mb-2">{content.title}</p>
        <ul className="mb-4">
          {content.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <button type="button" className="btn btn-outline-light" onClick={handleLogout}>
          Wyloguj
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card">
      <div className="d-flex gap-2 mb-3">
        <button
          type="button"
          className={`btn ${mode === "register" ? "btn-accent" : "btn-outline-light"}`}
          onClick={() => setMode("register")}
        >
          Rejestracja
        </button>
        <button
          type="button"
          className={`btn ${mode === "login" ? "btn-accent" : "btn-outline-light"}`}
          onClick={() => setMode("login")}
        >
          Logowanie
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="auth-email">
            Email
          </label>
          <input
            id="auth-email"
            type="email"
            className="form-control"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="auth-password">
            Hasło
          </label>
          <input
            id="auth-password"
            type="password"
            minLength={8}
            className="form-control"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        {mode === "register" ? (
          <>
            <div className="mb-3">
              <label className="form-label" htmlFor="auth-display-name">
                Imię i nazwisko
              </label>
              <input
                id="auth-display-name"
                type="text"
                className="form-control"
                required
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="auth-role">
                Typ konta
              </label>
              <select
                id="auth-role"
                className="form-select"
                value={role}
                onChange={(event) => setRole(event.target.value)}
              >
                <option value="student">Uczeń</option>
                <option value="parent">Rodzic</option>
              </select>
            </div>
          </>
        ) : null}

        {error ? <p className="text-danger">{error}</p> : null}

        <button type="submit" className="btn btn-accent" disabled={isSubmitting}>
          {isSubmitting ? "Przetwarzanie..." : mode === "register" ? "Załóż konto" : "Zaloguj"}
        </button>
      </form>
    </div>
  );
}

function mount(component, selector) {
  const element = document.querySelector(selector);

  if (!element) {
    return;
  }

  createRoot(element).render(component);
}

mount(<LandingRoadmap />, "#landing-roadmap-root");
mount(<ProgramsRepository />, "#programs-repository-root");
mount(<AuthWidget />, "#auth-widget-root");
