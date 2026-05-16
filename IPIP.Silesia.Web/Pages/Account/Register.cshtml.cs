using System.ComponentModel.DataAnnotations;
using IPIP.Silesia.Web.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace IPIP.Silesia.Web.Pages.Account;

public class RegisterModel(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager) : PageModel
{
    [BindProperty]
    public InputModel Input { get; set; } = new();

    public class InputModel
    {
        [Required(ErrorMessage = "Podaj adres e-mail.")]
        [EmailAddress(ErrorMessage = "Podaj poprawny adres e-mail.")]
        [Display(Name = "E-mail")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Podaj hasło.")]
        [DataType(DataType.Password)]
        [StringLength(100, MinimumLength = 8, ErrorMessage = "Hasło musi mieć co najmniej {2} znaków.")]
        [Display(Name = "Hasło")]
        public string Password { get; set; } = string.Empty;

        [Required(ErrorMessage = "Powtórz hasło.")]
        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "Hasła nie są takie same.")]
        [Display(Name = "Powtórz hasło")]
        public string ConfirmPassword { get; set; } = string.Empty;

        [Required(ErrorMessage = "Wybierz typ konta.")]
        [Display(Name = "Typ konta")]
        public string ProfileType { get; set; } = UserRole.Student;
    }

    public async Task<IActionResult> OnGetAsync()
    {
        if (User.Identity?.IsAuthenticated == true)
        {
            return RedirectToPage("/Profile");
        }

        return Page();
    }

    public async Task<IActionResult> OnPostAsync()
    {
        if (!ModelState.IsValid)
        {
            return Page();
        }

        if (Input.ProfileType is not (UserRole.Parent or UserRole.Student))
        {
            ModelState.AddModelError("Input.ProfileType", "Wybierz poprawny typ konta.");
            return Page();
        }

        var user = new ApplicationUser
        {
            UserName = Input.Email,
            Email = Input.Email,
            ProfileType = Input.ProfileType
        };

        var result = await userManager.CreateAsync(user, Input.Password);
        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }

            return Page();
        }

        await userManager.AddToRoleAsync(user, Input.ProfileType);
        await signInManager.SignInAsync(user, isPersistent: false);
        return RedirectToPage("/Profile");
    }
}
