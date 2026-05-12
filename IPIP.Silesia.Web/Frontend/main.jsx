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

function ProgramsTimeline({ programs }) {
  console.log("ProgramsTimeline received programs:", programs);
  const [filter, setFilter] = React.useState("Primary");

  const filteredPrograms = programs.filter(p => 
    (p.EducationLevel || p.educationLevel) === filter
  );
  console.log("Filtered programs:", filteredPrograms);

    return (
      <div className="timeline-shell">
        <div className="timeline-filters mb-4">
          <button 
            className={`filter-pill ${filter === "Primary" ? "active" : ""}`}
            onClick={() => setFilter("Primary")}
          >
            Szkoła podstawowa
          </button>
          <button 
            className={`filter-pill ${filter === "Secondary" ? "active" : ""}`}
            onClick={() => setFilter("Secondary")}
          >
            Szkoła średnia
          </button>
          <button 
            className={`filter-pill ${filter === "Parents" ? "active" : ""}`}
            onClick={() => setFilter("Parents")}
          >
            Dla rodziców
          </button>
        </div>
        <div className="timeline-container">
          <div className="timeline-content-wrapper">
            {filteredPrograms.length > 0 ? (
              filteredPrograms.map((program, index) => (
                <div key={program.Id || program.id} className="timeline-item">
                  <div className="timeline-content">
                    <span className="timeline-date">
                      {new Date(program.StartDate || program.startDate).toLocaleDateString('pl-PL', { month: 'short', year: 'numeric' })} 
                      - {new Date(program.EndDate || program.endDate).toLocaleDateString('pl-PL', { month: 'short', year: 'numeric' })}
                    </span>
                    <h3>{program.Name || program.name}</h3>
                    <p>{program.Description || program.description}</p>
                    {(program.Url || program.url) && <a href={program.Url || program.url} className="timeline-link">Więcej</a>}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-4" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
                Brak programów dla wybranej kategorii.
              </div>
            )}
          </div>
        </div>
        <style>{`
          .timeline-shell { font-family: sans-serif; color: inherit; }
          .timeline-filters { display: flex; gap: 0.5rem; justify-content: center; }
          .filter-pill { 
            padding: 0.3rem 1rem; 
            border-radius: 2rem; 
            border: 1px solid rgba(255,255,255,0.3); 
            background: rgba(255,255,255,0.1); 
            color: inherit;
            cursor: pointer; 
            transition: all 0.3s;
            font-size: 0.8rem;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
          }
          .filter-pill.active { background: #fff; color: #000; border-color: #fff; }
          .timeline-container { 
            position: relative; 
            max-width: 100%; 
            margin: 0 auto; 
            padding: 1rem 0 0 0;
            height: 300px;
            overflow-y: auto;
            overflow-x: hidden;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .timeline-container::-webkit-scrollbar { display: none; }
          .timeline-content-wrapper {
            position: relative;
            padding-left: 1.5rem;
            padding-bottom: 1rem;
          }
          .timeline-content-wrapper::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 2px;
            background: rgba(255,255,255,0.2);
            z-index: 0;
          }
          .timeline-item {
            position: relative;
            margin-bottom: 1.5rem;
            width: 100%;
            padding-left: 1.5rem;
            box-sizing: border-box;
            text-align: left;
            z-index: 1;
          }
          .timeline-item::before {
            content: '';
            position: absolute;
            left: -1.5rem;
            top: 1.5rem;
            width: 1.5rem;
            height: 2px;
            background: rgba(255,255,255,0.2);
            z-index: -1;
          }
          .timeline-content {
            background: rgba(255,255,255,0.05);
            padding: 1rem;
            border-radius: 0.5rem;
            border: 1px solid rgba(255,255,255,0.1);
            backdrop-filter: blur(4px);
            transition: all 0.2s ease;
            cursor: default;
          }
          .timeline-content:hover {
            background: rgba(255,255,255,0.12);
            border-color: rgba(255,255,255,0.4);
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          }
          .timeline-date { font-size: 0.75rem; color: rgba(255,255,255,0.6); font-weight: bold; }
          .timeline-content h3 { font-size: 1rem; margin: 0.2rem 0; color: #fff; }
          .timeline-content p { font-size: 0.85rem; margin: 0; color: rgba(255,255,255,0.8); }
          .timeline-link { display: inline-block; margin-top: 0.5rem; color: #fff; text-decoration: underline; font-size: 0.8rem; font-weight: bold; }
        `}</style>
      </div>
    );


}

function mount(component, selector, props = {}) {
  const element = document.querySelector(selector);

  if (!element) {
    return;
  }

  createRoot(element).render(component);
}

// Mount Roadmap
mount(<LandingRoadmap />, "#landing-roadmap-root");

// Mount Timeline with data from script tag
const timelineRoot = document.querySelector("#programs-timeline-root");
if (timelineRoot) {
  const dataElement = document.getElementById("programs-data");
  const programs = dataElement ? JSON.parse(dataElement.textContent) : [];
  createRoot(timelineRoot).render(<ProgramsTimeline programs={programs} />);
}
