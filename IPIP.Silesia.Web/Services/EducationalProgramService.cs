using IPIP.Silesia.Web.Data;
using IPIP.Silesia.Web.Models;
using Microsoft.EntityFrameworkCore;

namespace IPIP.Silesia.Web.Services;

public interface IEducationalProgramService
{
    Task<List<EducationalProgram>> GetAllProgramsAsync();
    Task<List<EducationalProgram>> GetProgramsByLevelAsync(string level);
}

public class EducationalProgramService : IEducationalProgramService
{
    private readonly ApplicationDbContext _context;

    public EducationalProgramService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<EducationalProgram>> GetAllProgramsAsync()
    {
        return await _context.EducationalPrograms
            .OrderBy(p => p.StartDate)
            .ToListAsync();
    }

    public async Task<List<EducationalProgram>> GetProgramsByLevelAsync(string level)
    {
        return await _context.EducationalPrograms
            .Where(p => p.EducationLevel == level)
            .OrderBy(p => p.StartDate)
            .ToListAsync();
    }
}
