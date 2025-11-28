// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
exports.getCategories = async (req, res, next) => {
  try {
    const categories = [
      {
        id: 1,
        name: 'Fertilizers',
        description: 'Premium quality fertilizers for all crops',
        icon: '🌱',
        productCount: 0
      },
      {
        id: 2,
        name: 'Seeds',
        description: 'High-yield certified seeds',
        icon: '🌾',
        productCount: 0
      },
      {
        id: 3,
        name: 'Pesticides',
        description: 'Effective pest control solutions',
        icon: '🐛',
        productCount: 0
      },
      {
        id: 4,
        name: 'Tools',
        description: 'Agricultural tools and equipment',
        icon: '🔧',
        productCount: 0
      },
      {
        id: 5,
        name: 'Organic',
        description: 'Certified organic products',
        icon: '🍃',
        productCount: 0
      }
    ];

    res.status(200).json({
      success: true,
      count: categories.length,
      categories
    });
  } catch (error) {
    next(error);
  }
};
