using System.ComponentModel.DataAnnotations;

namespace IPIP.Silesia.Web.Models;

public class EducationalProgram
{
    [Key]
    public int Id { get; set; }
    
    [Required]
    public string Name { get; set; } = string.Empty;
    
    [Required]
    public string Description { get; set; } = string.Empty;
    
    [Required]
    public string EducationLevel { get; set; } = string.Empty; // e.g., "Primary", "Secondary"
    
    [Required]
    public DateTime StartDate { get; set; }
    
    [Required]
    public DateTime EndDate { get; set; }
    
    public string? Url { get; set; }
}
