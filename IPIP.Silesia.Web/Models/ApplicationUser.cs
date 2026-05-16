using Microsoft.AspNetCore.Identity;

namespace IPIP.Silesia.Web.Models;

public class ApplicationUser : IdentityUser
{
    public string ProfileType { get; set; } = UserRole.Student;
}
