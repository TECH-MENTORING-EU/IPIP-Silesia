using System.ComponentModel.DataAnnotations;
using IPIP.Silesia.Web.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace IPIP.Silesia.Web.Pages.Account;

public class LoginModel(SignInManager<ApplicationUser> signInManager) : PageModel
{
    [BindProperty]
    public InputModel Input { get; set; } = new();

    [BindProperty(SupportsGet = true)]
    public string? ReturnUrl { get; set; }

    public class InputModel
    {
        [Required(ErrorMessage = "Podaj adres e-mail.")]
        [EmailAddress(ErrorMessage = "Podaj poprawny adres e-mail.")]
        [Display(Name = "E-mail")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Podaj hasło.")]
        [DataType(DataType.Password)]
        [Display(Name = "Hasło")]
        public string Password { get; set; } = string.Empty;
    }

    public async Task<IActionResult> OnGetAsync()
    {
        if (User.Identity?.IsAuthenticated == true)
        {
            return RedirectToPage("/Profile");
        }

        await HttpContext.SignOutAsync(IdentityConstants.ExternalScheme);
        return Page();
    }

    public async Task<IActionResult> OnPostAsync()
    {
        if (!ModelState.IsValid)
        {
            return Page();
        }

        var result = await signInManager.PasswordSignInAsync(Input.Email, Input.Password, isPersistent: false, lockoutOnFailure: false);
        if (result.Succeeded)
        {
            if (!string.IsNullOrWhiteSpace(ReturnUrl) && Url.IsLocalUrl(ReturnUrl))
            {
                return LocalRedirect(ReturnUrl);
            }

            return RedirectToPage("/Profile");
        }

        ModelState.AddModelError(string.Empty, "Nieprawidłowy e-mail lub hasło.");
        return Page();
    }
}
