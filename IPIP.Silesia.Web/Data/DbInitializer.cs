using IPIP.Silesia.Web.Data;
using IPIP.Silesia.Web.Models;
using Microsoft.EntityFrameworkCore;

namespace IPIP.Silesia.Web.Data;

public static class DbInitializer
{
    public static void Initialize(ApplicationDbContext context)
    {
        context.Database.EnsureCreated();

        var programs = new List<EducationalProgram>
        {
            // Primary School
            new EducationalProgram 
            { 
                Name = "Koduj z Pasją I", 
                Description = "Podstawy programowania w Scratch dla najmłodszych. Nauka logicznego myślenia przez zabawę.", 
                EducationLevel = "Primary", 
                StartDate = new DateTime(2026, 1, 1), 
                EndDate = new DateTime(2026, 3, 31) 
            },
            new EducationalProgram 
            { 
                Name = "Młody Przedsiębiorca", 
                Description = "Wprowadzenie do świata biznesu: jak stworzyć pierwszy produkt i sprzedać go w szkole.", 
                EducationLevel = "Primary", 
                StartDate = new DateTime(2026, 4, 1), 
                EndDate = new DateTime(2026, 6, 30) 
            },
            new EducationalProgram 
            { 
                Name = "Robotyka dla Dzieci", 
                Description = "Budowa i programowanie pierwszych robotów LEGO. Od mechaniki do inteligentnych algorytmów.", 
                EducationLevel = "Primary", 
                StartDate = new DateTime(2026, 9, 1), 
                EndDate = new DateTime(2026, 12, 15) 
            },
            new EducationalProgram 
            { 
                Name = "Cyfrowy Obywatel", 
                Description = "Bezpieczeństwo w sieci, walka z fake newsami i higiena cyfrowa dla dzieci.", 
                EducationLevel = "Primary", 
                StartDate = new DateTime(2026, 10, 1), 
                EndDate = new DateTime(2026, 12, 20) 
            },
            new EducationalProgram 
            { 
                Name = "Młody Twórca Gier", 
                Description = "Podstawy projektowania poziomów i mechaniki gier w Roblox Studio.", 
                EducationLevel = "Primary", 
                StartDate = new DateTime(2026, 11, 1), 
                EndDate = new DateTime(2026, 12, 31) 
            },
            // Secondary School
            new EducationalProgram 
            { 
                Name = "Web Dev Masterclass", 
                Description = "Tworzenie nowoczesnych aplikacji webowych (React, .NET). Budowa realnego projektu portfolio.", 
                EducationLevel = "Secondary", 
                StartDate = new DateTime(2026, 1, 1), 
                EndDate = new DateTime(2026, 4, 30) 
            },
            new EducationalProgram 
            { 
                Name = "AI & Machine Learning", 
                Description = "Wprowadzenie do sztucznej inteligencji: od prompt engineeringu po proste modele ML.", 
                EducationLevel = "Secondary", 
                StartDate = new DateTime(2026, 5, 1), 
                EndDate = new DateTime(2026, 8, 31) 
            },
            new EducationalProgram 
            { 
                Name = "Startup Accelerator", 
                Description = "Od pomysłu do MVP - warsztaty z lean startup, walidacji rynku i prezentacji pitch-deck.", 
                EducationLevel = "Secondary", 
                StartDate = new DateTime(2026, 9, 1), 
                EndDate = new DateTime(2026, 12, 31) 
            },
            new EducationalProgram 
            { 
                Name = "Cyber Security Expert", 
                Description = "Podstawy etycznego hackingu, ochrona danych i analiza zagrożeń w sieciach korporacyjnych.", 
                EducationLevel = "Secondary", 
                StartDate = new DateTime(2026, 10, 1), 
                EndDate = new DateTime(2026, 12, 31) 
            },
            // Parents
            new EducationalProgram 
            { 
                Name = "Cyfrowy Przewodnik Rodzica", 
                Description = "Jak wspierać dziecko w nauce kodowania i dbać o jego bezpieczeństwo w internecie.", 
                EducationLevel = "Parents", 
                StartDate = new DateTime(2026, 2, 1), 
                EndDate = new DateTime(2026, 3, 15) 
            },
            new EducationalProgram 
            { 
                Name = "Wspieranie Innowacyjności", 
                Description = "Jak rozpoznać talent przedsiębiorczy u dziecka i pomóc mu rozwinąć własny pomysł na biznes.", 
                EducationLevel = "Parents", 
                StartDate = new DateTime(2026, 6, 1), 
                EndDate = new DateTime(2026, 7, 15) 
            },
        };

        foreach (var program in programs)
        {
            if (!context.EducationalPrograms.Any(p => p.Name == program.Name))
            {
                context.EducationalPrograms.Add(program);
            }
        }
        context.SaveChanges();
    }
}
