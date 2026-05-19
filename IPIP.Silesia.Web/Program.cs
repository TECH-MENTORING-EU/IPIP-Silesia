using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddDbContext<IPIP.Silesia.Web.Data.ApplicationDbContext>(options =>
    options.UseSqlServer("Server=.;Database=IPIP_Silesia;Trusted_Connection=True;TrustServerCertificate=True;"));
builder.Services.AddScoped<IPIP.Silesia.Web.Services.IEducationalProgramService, IPIP.Silesia.Web.Services.EducationalProgramService>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<IPIP.Silesia.Web.Data.ApplicationDbContext>();
    IPIP.Silesia.Web.Data.DbInitializer.Initialize(context);
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();
app.MapRazorPages()
   .WithStaticAssets();

app.Run();
