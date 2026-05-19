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

const repositoryLevels = ["All", "Primary", "Secondary"];

const levelLabels = {
  All: "Wszystkie",
  Primary: "Podstawówka",
  Secondary: "Szkoła średnia"
};

function normalizeProgram(program) {
  return {
    id: program.Id ?? program.id,
    name: program.Name ?? program.name,
    description: program.Description ?? program.description,
    level: program.EducationLevel ?? program.educationLevel,
    startDate: program.StartDate ?? program.startDate,
    endDate: program.EndDate ?? program.endDate,
    url: program.Url ?? program.url ?? null
  };
}

function getRepositoryPrograms(programs) {
  return programs
    .map(normalizeProgram)
    .filter((program) => repositoryLevels.includes(program.level))
    .sort((left, right) => new Date(left.startDate) - new Date(right.startDate));
}

function formatProgramRange(program) {
  const options = { month: "short", year: "numeric" };
  return `${new Date(program.startDate).toLocaleDateString("pl-PL", options)} - ${new Date(program.endDate).toLocaleDateString("pl-PL", options)}`;
}

function buildProgramsUrl(level, selectedProgramId) {
  const url = new URL("/Programs", window.location.origin);

  if (level && level !== "All") {
    url.searchParams.set("level", level);
  }

  if (selectedProgramId) {
    url.searchParams.set("selected", selectedProgramId);
  }

  return `${url.pathname}${url.search}`;
}

function orderPrograms(programs, selectedProgramId) {
  if (!selectedProgramId) {
    return programs;
  }

  return [...programs].sort((left, right) => {
    if (left.id === selectedProgramId) {
      return -1;
    }

    if (right.id === selectedProgramId) {
      return 1;
    }

    return new Date(left.startDate) - new Date(right.startDate);
  });
}

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

function TimelineLevel({ level, programs }) {
  return (
    <section className={`landing-timeline-group ${level.toLowerCase()}`}>
      <div className="landing-timeline-group-heading">
        <h2>{levelLabels[level]}</h2>
      </div>
      <div className="landing-timeline-items">
        {programs.map((program, index) => (
          <button
            key={program.id}
            type="button"
            className={`timeline-program-card ${index % 2 === 0 ? "is-top" : "is-bottom"}`}
            onClick={() => {
              window.location.href = buildProgramsUrl(level, program.id);
            }}
          >
            <span className="timeline-program-range">{formatProgramRange(program)}</span>
            <strong>{program.name}</strong>
            <span>{program.description}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function ProgramsTimeline({ programs }) {
  const repositoryPrograms = React.useMemo(() => getRepositoryPrograms(programs), [programs]);
  const primaryPrograms = repositoryPrograms.filter((program) => program.level === "Primary");
  const secondaryPrograms = repositoryPrograms.filter((program) => program.level === "Secondary");

  return (
    <div className="landing-timeline-shell">
      <div className="landing-timeline-board">
        <div className="landing-timeline-divider" aria-hidden="true"></div>
        <TimelineLevel level="Primary" programs={primaryPrograms} />
        <TimelineLevel level="Secondary" programs={secondaryPrograms} />
      </div>
    </div>
  );
}

function ProgramsRepository({ programs, initialLevel, initialSelectedProgramId }) {
  const repositoryPrograms = React.useMemo(() => getRepositoryPrograms(programs), [programs]);
  const safeInitialLevel = repositoryLevels.includes(initialLevel) ? initialLevel : "All";
  const initialSelectedProgram = repositoryPrograms.find((program) => program.id === initialSelectedProgramId) ?? null;
  const [activeLevel, setActiveLevel] = React.useState(initialSelectedProgram?.level ?? safeInitialLevel);
  const [selectedProgramId, setSelectedProgramId] = React.useState(initialSelectedProgram?.id ?? null);

  const selectedProgram = repositoryPrograms.find((program) => program.id === selectedProgramId) ?? null;
  const selectedLevel = selectedProgram?.level ?? null;

  React.useEffect(() => {
    const url = buildProgramsUrl(selectedProgram?.level ?? activeLevel, selectedProgram?.id ?? null);
    window.history.replaceState({}, "", url);
  }, [activeLevel, selectedProgram]);

  const filteredPrograms = repositoryPrograms.filter(
    (program) => activeLevel === "All" || program.level === activeLevel
  );

  const selectedPrograms = selectedLevel
    ? orderPrograms(
        repositoryPrograms.filter((program) => program.level === selectedLevel),
        selectedProgramId
      )
    : [];

  return (
    <div className="programs-repository-shell">
      <div className="programs-repository-toolbar">
        <div className="filter-pills repository-filter-pills">
          {repositoryLevels.map((level) => {
            const isActive = selectedProgram ? selectedLevel === level : activeLevel === level;

            return (
            <button
              key={level}
              type="button"
              className={`filter-pill ${isActive ? "active" : ""}`}
              onClick={() => {
                setSelectedProgramId(null);
                setActiveLevel(level);
              }}
            >
              <strong>{levelLabels[level]}</strong>
              <span>{level === "All" ? "pełny katalog programów" : `programy: ${levelLabels[level].toLowerCase()}`}</span>
            </button>
            );
          })}
        </div>
      </div>

      {selectedProgram ? (
        <div className="repository-selection-view">
          <div className="repository-selection-copy">
            <span className="badge-soft">Wybrany program</span>
            <h2>{levelLabels[selectedLevel]}</h2>
            <p>
              Wybrany program znajduje się na początku listy. Pozostałe projekty z tej samej sekcji możesz przewijać poniżej.
            </p>
          </div>
          <div className="repository-scroll-list">
            {selectedPrograms.map((program, index) => (
              <article
                key={program.id}
                className={`repository-program-card ${index === 0 ? "is-featured" : ""}`}
              >
                <div className="repository-program-header">
                  <div>
                    <p className="card-kicker mb-2">{levelLabels[program.level]}</p>
                    <h3>{program.name}</h3>
                  </div>
                  <span className="repository-program-range">{formatProgramRange(program)}</span>
                </div>
                <p>{program.description}</p>
                <div className="repository-program-actions">
                  {program.url ? (
                    <a className="btn btn-link p-0" href={program.url}>
                      Zobacz więcej
                    </a>
                  ) : null}
                  {index !== 0 ? (
                    <button
                      type="button"
                      className="btn btn-link p-0"
                      onClick={() => setSelectedProgramId(program.id)}
                    >
                      Pokaż jako pierwszy
                    </button>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <div className="repository-grid">
          {filteredPrograms.map((program) => (
            <article key={program.id} className="repository-program-card">
              <p className="card-kicker mb-2">{levelLabels[program.level]}</p>
              <div className="repository-program-header">
                <h3>{program.name}</h3>
                <span className="repository-program-range">{formatProgramRange(program)}</span>
              </div>
              <p>{program.description}</p>
              <div className="repository-program-actions">
                <button
                  type="button"
                  className="btn btn-link p-0"
                  onClick={() => {
                    setSelectedProgramId(program.id);
                    setActiveLevel(program.level);
                  }}
                >
                  Pokaż w sekcji
                </button>
                {program.url ? (
                  <a className="btn btn-link p-0" href={program.url}>
                    Zobacz więcej
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}
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

function readJsonData(id) {
  const element = document.getElementById(id);
  return element?.textContent ? JSON.parse(element.textContent) : [];
}

mount(<LandingRoadmap />, "#landing-roadmap-root");

const timelineRoot = document.querySelector("#programs-timeline-root");
if (timelineRoot) {
  createRoot(timelineRoot).render(<ProgramsTimeline programs={readJsonData("programs-data")} />);
}

const repositoryRoot = document.querySelector("#programs-repository-root");
if (repositoryRoot) {
  const initialSelectedProgramId = Number.parseInt(repositoryRoot.dataset.selectedProgramId ?? "", 10);

  createRoot(repositoryRoot).render(
    <ProgramsRepository
      programs={readJsonData("programs-repository-data")}
      initialLevel={repositoryRoot.dataset.initialLevel || "All"}
      initialSelectedProgramId={Number.isNaN(initialSelectedProgramId) ? null : initialSelectedProgramId}
    />
  );
}
