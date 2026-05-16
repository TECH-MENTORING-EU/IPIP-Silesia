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

function AuthStatus() {
  const [state, setState] = React.useState({ status: "loading", message: "Sprawdzanie sesji..." });

  React.useEffect(() => {
    let cancelled = false;

    fetch("/api/account/profile", { credentials: "include" })
      .then(async (response) => {
        if (cancelled) {
          return;
        }

        if (response.status === 401) {
          setState({
            status: "unauthorized",
            message: "Aby korzystać z endpointów API, zaloguj się lub utwórz konto rodzica/ucznia."
          });
          return;
        }

        if (!response.ok) {
          setState({ status: "error", message: "Nie udało się pobrać danych konta." });
          return;
        }

        const data = await response.json();
        setState({
          status: "authorized",
          message: `Zalogowano: ${data.email} (${data.profileType}).`
        });
      })
      .catch(() => {
        if (!cancelled) {
          setState({ status: "error", message: "Błąd połączenia z API." });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const className = state.status === "authorized" ? "alert alert-success" : "alert alert-secondary";
  return <div className={className}>{state.message}</div>;
}

function mount(component, selector) {
  const element = document.querySelector(selector);

  if (!element) {
    return;
  }

  createRoot(element).render(component);
}

mount(<AuthStatus />, "#auth-status-root");
mount(<LandingRoadmap />, "#landing-roadmap-root");
mount(<ProgramsRepository />, "#programs-repository-root");
