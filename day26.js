/**
 * Executes an aggregation pipeline to calculate product statistics
 * @returns {Object} - Aggregated product statistics
 */
function getProductStatistics() {
    // Aggregation pipeline
    const pipeline = [
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },        // Count the total number of products
          averagePrice: { $avg: '$price' },  // Calculate the average price
          highestQuantity: { $max: '$quantity' }  // Find the highest quantity
        }
      }
    ];
  
    // Execute the aggregation pipeline on your MongoDB collection (replace 'products' with your collection name)
    const result = db.collection('products').aggregate(pipeline).toArray();
  
    // Check if there is a result
    if (result.length === 0) {
      throw new Error('No products found.');
    }
  
    // Extract the result from the array (as there's only one group, _id will be null)
    const aggregatedStats = result[0];
  
    return aggregatedStats;
  }
  
  // Example usage
  try {
    const productStatistics = getProductStatistics();
    console.log(productStatistics);
  } catch (error) {
    console.error(error.message);
  }  