using Microsoft.EntityFrameworkCore;
using IPIP.Silesia.Web.Models;

namespace IPIP.Silesia.Web.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<EducationalProgram> EducationalPrograms { get; set; } = null!;
}
