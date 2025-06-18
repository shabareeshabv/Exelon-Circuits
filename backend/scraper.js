const puppeteer = require('puppeteer');
const Product = require('./productModel');

async function scrapeAndSave() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://books.toscrape.com');

  const products = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.product_pod')).map(product => ({
      name: product.querySelector('h3 a').title,
      price: product.querySelector('.price_color').innerText,
      description: 'No description available',
      rating: product.querySelector('.star-rating').classList[1], // e.g., 'Three'
    }));
  });

  await Product.deleteMany(); // Clear old data
  await Product.insertMany(products); // Save new data
  console.log('✅ Products scraped and saved to MongoDB');

  await browser.close();
}

module.exports = scrapeAndSave;
