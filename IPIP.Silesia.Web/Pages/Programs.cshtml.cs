using IPIP.Silesia.Web.Models;
using IPIP.Silesia.Web.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace IPIP.Silesia.Web.Pages;

public class ProgramsModel : PageModel
{
    private static readonly HashSet<string> SupportedLevels = new(StringComparer.OrdinalIgnoreCase)
    {
        "Primary",
        "Secondary"
    };

    private readonly IEducationalProgramService _programService;

    public ProgramsModel(IEducationalProgramService programService)
    {
        _programService = programService;
    }

    [BindProperty(SupportsGet = true, Name = "level")]
    public string? Level { get; set; }

    [BindProperty(SupportsGet = true, Name = "selected")]
    public int? SelectedProgramId { get; set; }

    public List<EducationalProgram> Programs { get; private set; } = new();

    public string? InitialLevelFilter { get; private set; }

    public async Task OnGetAsync()
    {
        Programs = (await _programService.GetAllProgramsAsync())
            .Where(program => SupportedLevels.Contains(program.EducationLevel))
            .OrderBy(program => program.StartDate)
            .ToList();

        var selectedProgram = SelectedProgramId.HasValue
            ? Programs.FirstOrDefault(program => program.Id == SelectedProgramId.Value)
            : null;

        InitialLevelFilter = NormalizeLevel(Level) ?? selectedProgram?.EducationLevel;
    }

    private static string? NormalizeLevel(string? level)
    {
        if (string.IsNullOrWhiteSpace(level))
        {
            return null;
        }

        return SupportedLevels.FirstOrDefault(supportedLevel =>
            string.Equals(supportedLevel, level, StringComparison.OrdinalIgnoreCase));
    }
}
