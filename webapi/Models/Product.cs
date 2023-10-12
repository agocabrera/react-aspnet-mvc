using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string? Name { get; set; }

        [MaxLength(500)]
        public string? Description { get; set; }

        [Required]
        [Range(0.1, double.MaxValue)]
        public decimal Price { get; set; }

    }
}
