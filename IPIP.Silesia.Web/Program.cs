using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using IPIP.Silesia.Web.Data;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();
builder.Services.AddMemoryCache();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
                           ?? "Data Source=ipip.silesia.db";
    options.UseSqlite(connectionString);
});
builder.Services.AddScoped<IPasswordHasher<UserAccount>, PasswordHasher<UserAccount>>();
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.Cookie.HttpOnly = true;
        options.Cookie.SameSite = SameSiteMode.Lax;
        options.LoginPath = "/";
    });
builder.Services.AddAuthorization();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    dbContext.Database.EnsureCreated();
}

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

var authGroup = app.MapGroup("/api/auth");

authGroup.MapPost("/pkce/challenge", (PkceChallengeRequest request, IMemoryCache cache) =>
{
    if (string.IsNullOrWhiteSpace(request.CodeChallenge) || request.CodeChallengeMethod != "S256")
    {
        return Results.BadRequest(new { message = "Nieprawidłowe dane PKCE." });
    }

    var challengeToken = Guid.NewGuid().ToString("N");
    cache.Set($"pkce:{challengeToken}", request.CodeChallenge, TimeSpan.FromMinutes(5));
    return Results.Ok(new { challengeToken });
});

authGroup.MapPost("/register", async (
    RegisterRequest request,
    ApplicationDbContext dbContext,
    IPasswordHasher<UserAccount> passwordHasher,
    IMemoryCache cache,
    HttpContext httpContext) =>
{
    if (!HasValidCredentials(request.Email, request.Password))
    {
        return Results.BadRequest(new { message = "Email i hasło są wymagane (min. 8 znaków hasła)." });
    }

    if (string.IsNullOrWhiteSpace(request.DisplayName))
    {
        return Results.BadRequest(new { message = "Imię i nazwisko jest wymagane." });
    }

    if (!TryValidatePkce(request.ChallengeToken, request.CodeVerifier, cache))
    {
        return Results.BadRequest(new { message = "Weryfikacja PKCE nie powiodła się." });
    }

    if (!Enum.TryParse<UserRole>(request.Role, true, out var userRole))
    {
        return Results.BadRequest(new { message = "Rola musi być parent lub student." });
    }

    var normalizedEmail = request.Email.Trim().ToLowerInvariant();
    var exists = await dbContext.Users.AnyAsync(u => u.Email == normalizedEmail);
    if (exists)
    {
        return Results.Conflict(new { message = "Użytkownik z tym adresem email już istnieje." });
    }

    var user = new UserAccount
    {
        Email = normalizedEmail,
        DisplayName = request.DisplayName.Trim(),
        Role = userRole
    };
    user.PasswordHash = passwordHasher.HashPassword(user, request.Password);

    dbContext.Users.Add(user);
    await dbContext.SaveChangesAsync();
    cache.Remove($"pkce:{request.ChallengeToken}");

    await SignInAsync(httpContext, user);
    return Results.Ok(new { role = user.Role.ToString().ToLowerInvariant(), displayName = user.DisplayName });
});

authGroup.MapPost("/login", async (
    LoginRequest request,
    ApplicationDbContext dbContext,
    IPasswordHasher<UserAccount> passwordHasher,
    IMemoryCache cache,
    HttpContext httpContext) =>
{
    if (!HasValidCredentials(request.Email, request.Password))
    {
        return Results.BadRequest(new { message = "Email i hasło są wymagane (min. 8 znaków hasła)." });
    }

    if (!TryValidatePkce(request.ChallengeToken, request.CodeVerifier, cache))
    {
        return Results.BadRequest(new { message = "Weryfikacja PKCE nie powiodła się." });
    }

    var normalizedEmail = request.Email.Trim().ToLowerInvariant();
    var user = await dbContext.Users.SingleOrDefaultAsync(u => u.Email == normalizedEmail);
    if (user is null)
    {
        return Results.Unauthorized();
    }

    var result = passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password);
    if (result == PasswordVerificationResult.Failed)
    {
        return Results.Unauthorized();
    }

    cache.Remove($"pkce:{request.ChallengeToken}");
    await SignInAsync(httpContext, user);
    return Results.Ok(new { role = user.Role.ToString().ToLowerInvariant(), displayName = user.DisplayName });
});

authGroup.MapGet("/me", (ClaimsPrincipal user) =>
{
    if (user.Identity?.IsAuthenticated != true)
    {
        return Results.Ok(new { isAuthenticated = false });
    }

    return Results.Ok(new
    {
        isAuthenticated = true,
        displayName = user.FindFirstValue(ClaimTypes.Name),
        role = user.FindFirstValue(ClaimTypes.Role)
    });
});

authGroup.MapPost("/logout", async (HttpContext httpContext) =>
{
    await httpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
    return Results.NoContent();
});

app.MapStaticAssets();
app.MapRazorPages()
   .WithStaticAssets();

app.Run();

static bool TryValidatePkce(string challengeToken, string codeVerifier, IMemoryCache cache)
{
    if (string.IsNullOrWhiteSpace(challengeToken)
        || string.IsNullOrWhiteSpace(codeVerifier)
        || !cache.TryGetValue<string>($"pkce:{challengeToken}", out var codeChallenge)
        || string.IsNullOrWhiteSpace(codeChallenge))
    {
        return false;
    }

    var challenge = Convert.ToBase64String(SHA256.HashData(Encoding.UTF8.GetBytes(codeVerifier)))
        .TrimEnd('=')
        .Replace('+', '-')
        .Replace('/', '_');

    return string.Equals(challenge, codeChallenge, StringComparison.Ordinal);
}

static bool HasValidCredentials(string email, string password)
{
    return !string.IsNullOrWhiteSpace(email)
           && !string.IsNullOrWhiteSpace(password)
           && password.Length >= 8;
}

static Task SignInAsync(HttpContext httpContext, UserAccount user)
{
    var claims = new[]
    {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(ClaimTypes.Name, user.DisplayName),
        new Claim(ClaimTypes.Email, user.Email),
        new Claim(ClaimTypes.Role, user.Role.ToString().ToLowerInvariant())
    };

    var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
    var principal = new ClaimsPrincipal(identity);
    return httpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);
}

public sealed record PkceChallengeRequest(string CodeChallenge, string CodeChallengeMethod);
public sealed record RegisterRequest(string Email, string Password, string DisplayName, string Role, string ChallengeToken, string CodeVerifier);
public sealed record LoginRequest(string Email, string Password, string ChallengeToken, string CodeVerifier);
