using Microsoft.AspNetCore.Mvc;
using webapi.Models;

namespace webapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        // Get database context through dependency injection.
        private readonly AppDbContext _context;

        // Class constructor.
        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        // GET all products.
        [HttpGet]
        public ActionResult<IEnumerable<Product>> GetProducts()
        {
            List<Product> products = _context.Products.ToList();
            return Ok(products);
        }

        // GET a single product using its ID.
        [HttpGet("{id:int}")]
        public ActionResult<Product> GetProductById(int id)
        {
            Product? product = _context.Products.Find(id);

            if (product == null) { return NotFound(); }

            return Ok(product);
        }

        // POST a new product.
        [HttpPost]
        public ActionResult CreateProduct(Product product)
        {
            if (ModelState.IsValid)
            {
                _context.Products.Add(product);
                _context.SaveChanges();
                return Ok();
            }

            else
            {
                return BadRequest(ModelState);
            }
        }

        // PUT a product.
        [HttpPut("{id:int}")]
        public ActionResult ModifyProduct(int id, Product product)
        {
            if (id <= 0) { return NotFound(); }

            Product? storedProduct = _context.Products.Find(id);

            if (storedProduct == null) { return NotFound(); }

            storedProduct.Name = product.Name;
            storedProduct.Description = product.Description;
            storedProduct.Price = product.Price;

            _context.SaveChanges();

            return Ok(product);
        }

        // DELETE a product.
        [HttpDelete("{id:int}")]
        public ActionResult DeleteProduct(int id)
        {
            if (id <= 0) { return NotFound(); }

            Product? product = _context.Products.Find(id);

            if (product == null) { return NotFound(); }

            _context.Products.Remove(product);
            _context.SaveChanges();

            return NoContent();
        }

    }
}
