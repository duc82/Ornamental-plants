const pool = require("../config");
const slugify = require("slugify");

const getAllProductsDb = async ({ limit, offset }) => {
  const { rows: products } = await pool.query(
    `select products.*, trunc(avg(reviews.rating)) as avg_rating, count(reviews.*) from products 
        LEFT JOIN reviews
        ON products.product_id = reviews.product_id 
        GROUP BY products.product_id 
        ORDER BY products.created_at DESC
        limit $1 offset $2`,
    [limit, offset]
  );
  const { rows } = await pool.query("select count(*) from products");
  const total = +rows[0].count;
  return { total, products };
};

const createProductDb = async ({ name, price, description, image }) => {
  const slug = slugify(name, {
    lower: true,
    strict: true,
    locale: "vi",
  });
  const { rows: product } = await pool.query(
    "INSERT INTO products(name, slug, price, description, image) VALUES($1, $2, $3, $4, $5) returning *",
    [name, slug, price, description, image]
  );
  return product[0];
};

const getProductDb = async (id) => {
  const { rows: product } = await pool.query(
    `select products.*, trunc(avg(reviews.rating),1) as avg_rating, count(reviews.*) from products
        LEFT JOIN reviews
        ON products.product_id = reviews.product_id
        where products.product_id = $1
        group by products.product_id`,
    [id]
  );
  return product[0];
};

const getProductBySlugDb = async ({ slug }) => {
  const { rows: product } = await pool.query(
    `select products.*, trunc(avg(reviews.rating),1) as avg_rating, count(reviews.*) from products
        LEFT JOIN reviews
        ON products.product_id = reviews.product_id
        where products.slug = $1
        group by products.product_id`,
    [slug]
  );
  return product[0];
};

const getProductByNameDb = async ({ name }) => {
  const { rows: product } = await pool.query(
    `select products.*, trunc(avg(reviews.rating),1) as avg_rating, count(reviews.*) from products
        LEFT JOIN reviews
        ON products.product_id = reviews.product_id
        where products.name = $1
        group by products.product_id`,
    [name]
  );
  return product[0];
};

const updateProductDb = async ({ name, price, description, image, id }) => {
  const slug = slugify(name, {
    lower: true,
    strict: true,
    locale: "vi",
  });
  const { rows: product } = await pool.query(
    "UPDATE products set name = $1, price = $2, description = $3, image = $4, slug = $5 where product_id = $6 returning *",
    [name, price, description, image, slug, id]
  );
  return product[0];
};

const deleteProductDb = async (id) => {
  const { rows } = await pool.query(
    "DELETE FROM products where product_id = $1 returning *",
    [id]
  );
  return rows[0];
};

module.exports = {
  getProductDb,
  getProductByNameDb,
  createProductDb,
  updateProductDb,
  deleteProductDb,
  getAllProductsDb,
  getProductBySlugDb,
};
