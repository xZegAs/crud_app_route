var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var imageInput = document.getElementById("productImage");
var container = document.getElementById("productContainer");

var searchInput = document.getElementById("searchInput");

var addBtn = document.getElementById("addButton");
var updateBtn = document.getElementById("updateButton");

var products = JSON.parse(localStorage.getItem("products")) || [];
var editIndex = null;

// Add Product
function addProduct() {
  if (
    !productName.value ||
    !productPrice.value ||
    !productCategory.value ||
    !productDescription.value ||
    !imageInput.files[0]
  ) {
    alert("All fields are required!");
    return;
  }

  var product = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    description: productDescription.value,
    image: "images/" + imageInput.files[0].name,
  };
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));
  displayProducts();
  clearInputs();
}

// Display Products
function displayProducts(filteredProducts) {
  container.innerHTML = "";
  var items = filteredProducts || products;

  for (var i = 0; i < items.length; i++) {
    var product = items[i];
    container.innerHTML += `
            <div class="col-md-3">
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${
      product.name
    }">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">Price: $${product.price}</p>
                        <p class="card-text">Category: ${product.category}</p>
                        <p class="card-text">${product.description}</p>
                        <button class="btn btn-danger w-100 mb-2" onclick="deleteProduct(${products.indexOf(
                          product
                        )})">Delete</button>
                        <button class="btn btn-warning w-100" onclick="prepareEdit(${products.indexOf(
                          product
                        )})">Edit</button>
                    </div>
                </div>
            </div>
        `;
  }
}

// Delete Product
function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  displayProducts();
}

// Prepare for Editing
function prepareEdit(index) {
  var product = products[index];
  editIndex = index;
  productName.value = product.name;
  productPrice.value = product.price;
  productCategory.value = product.category;
  productDescription.value = product.description;
  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}

// Update Product
function updateProduct() {
  if (
    !productName.value ||
    !productPrice.value ||
    !productCategory.value ||
    !productDescription.value
  ) {
    alert("All fields are required!");
    return;
  }

  // Update the existing product details
  products[editIndex].name = productName.value;
  products[editIndex].price = productPrice.value;
  products[editIndex].category = productCategory.value;
  products[editIndex].description = productDescription.value;

  // Update the image only if a new file is selected
  if (imageInput.files[0]) {
    products[editIndex].image = "images/" + imageInput.files[0].name;
  }

  localStorage.setItem("products", JSON.stringify(products));
  displayProducts();
  clearInputs();

  // Reset the form buttons
  addBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");
}

// Search Product
function searchProduct() {
  var searchValue = searchInput.value.toLowerCase();
  var filteredProducts = [];

  for (var i = 0; i < products.length; i++) {
    var product = products[i];
    if (
      product.name.toLowerCase().includes(searchValue) ||
      product.category.toLowerCase().includes(searchValue)
    ) {
      filteredProducts.push(product);
    }
  }

  displayProducts(filteredProducts);
}

// Clear Inputs
function clearInputs() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDescription.value = "";
  imageInput.value = "";
  editIndex = null;
}

displayProducts();
