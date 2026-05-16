using IPIP.Silesia.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace IPIP.Silesia.Web.Pages.Account;

[Authorize]
public class LogoutModel(SignInManager<ApplicationUser> signInManager) : PageModel
{
    public IActionResult OnGet()
    {
        return RedirectToPage("/Index");
    }

    public async Task<IActionResult> OnPostAsync()
    {
        await signInManager.SignOutAsync();
        return RedirectToPage("/Index");
    }
}
