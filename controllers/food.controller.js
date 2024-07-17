import asyncHandler from '../utils/async-handler.js';
import Food from '../models/food.model.js';
import pagination from '../utils/paginatedResult.js';
export const getAllFoods = asyncHandler(async (req, res) => {
  console.log(req.query.page);
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  if (endIndex < (await Food.countDocuments().exec())) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }
  results.results = await Food.find().limit(limit).skip(startIndex).exec();
  return res.json(results);
});

export const createFood = asyncHandler(async (req, res) => {
  const {
    name,
    imageUrl,
    ingredients,
    calorie,
    price,
    carbs,
    fat,
    protein,
    restaurantName,
    deliveryTime,
    category,
    rating,
    tags,
    countInStock,
  } = req.body;

  console.log(
    name,
    imageUrl,
    ingredients,
    calorie,
    price,
    carbs,
    fat,
    protein,
    rating,
    restaurantName,
    deliveryTime,
    category,
    tags,
    countInStock
  );
  const food = await Food.create({
    name,
    imageUrl,
    ingredients,
    calorie,
    price,
    carbs,
    fat,
    protein,
    rating,
    restaurantName,
    deliveryTime,
    category,
    tags,
    countInStock,
  });
  await food.save();
  return res.status(201).json(food);
});

export const getFoodById = asyncHandler(async (req, res) => {
  const food = await Food.findById(req.params.id);
  return res.status(201).json(food);
});
