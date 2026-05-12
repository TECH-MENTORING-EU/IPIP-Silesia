using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using IPIP.Silesia.Web.Models;
using IPIP.Silesia.Web.Services;

namespace IPIP.Silesia.Web.Pages;

public class IndexModel : PageModel
{
    private readonly IEducationalProgramService _programService;

    public IndexModel(IEducationalProgramService programService)
    {
        _programService = programService;
    }

    public List<EducationalProgram> Programs { get; set; } = new();

    public async Task OnGetAsync()
    {
        Programs = await _programService.GetAllProgramsAsync();
    }
}
