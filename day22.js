// app.js
const mongoose = require('mongoose');

// Define Mongoose schema and model
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const Product = mongoose.model('Product', productSchema);

// Implement CRUD operations
async function createProduct(product) {
  try {
    const newProduct = new Product(product);
    await newProduct.save();
    console.log('Product created successfully:', newProduct);
  } catch (error) {
    console.error('Error creating product:', error.message);
  }
}

async function getAllProducts() {
  try {
    const products = await Product.find();
    console.log('All products:', products);
    return products;
  } catch (error) {
    console.error('Error retrieving products:', error.message);
    return [];
  }
}

async function updateProduct(productId, updatedProduct) {
  try {
    const product = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
    console.log('Product updated successfully:', product);
  } catch (error) {
    console.error('Error updating product:', error.message);
  }
}

async function deleteProduct(productId) {
  try {
    const product = await Product.findByIdAndDelete(productId);
    console.log('Product deleted successfully:', product);
  } catch (error) {
    console.error('Error deleting product:', error.message);
  }
}

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Example usage
const product1 = { name: 'Product 1', price: 20, quantity: 100 };

createProduct(product1)
  .then(() => getAllProducts())
  .then(() => updateProduct('product_id_here', { price: 25 }))
  .then(() => deleteProduct('product_id_here'))
  .finally(() => mongoose.disconnect());
