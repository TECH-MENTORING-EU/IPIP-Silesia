using IPIP.Silesia.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace IPIP.Silesia.Web.Pages;

[Authorize]
public class ProfileModel(UserManager<ApplicationUser> userManager) : PageModel
{
    public string Email { get; private set; } = string.Empty;
    public string ProfileTypeDisplayName { get; private set; } = string.Empty;
    public IList<string> Roles { get; private set; } = [];

    public async Task<IActionResult> OnGetAsync()
    {
        var user = await userManager.GetUserAsync(User);
        if (user is null)
        {
            return RedirectToPage("/Account/Login");
        }

        Email = user.Email ?? string.Empty;
        ProfileTypeDisplayName = user.ProfileType == UserRole.Parent ? "Rodzic" : "Uczeń";
        Roles = await userManager.GetRolesAsync(user);
        return Page();
    }
}
