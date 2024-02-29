const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
});

const ProductWithCategory = mongoose.model('ProductWithCategory', productSchema);

async function getProductsPopulatedWithCategory() {
  try {
    const products = await ProductWithCategory.find().populate('category').exec();
    return products;
  } catch (error) {
    console.error('Error fetching products with category details:', error);
    throw error;
  }
}

async function main() {
  try {
    await mongoose.connect('your-mongodb-connection-string', { useNewUrlParser: true, useUnifiedTopology: true });

    const productsWithCategory = await getProductsPopulatedWithCategory();
    console.log(productsWithCategory);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

main();
