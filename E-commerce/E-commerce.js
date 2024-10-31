document.getElementById('productForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission
    
    // Get the form values
    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;
    const productPrice = document.getElementById('productPrice').value;
    const productImage = document.getElementById('productImage').files[0];
    
    // Create a new product item
    const newProductItem = document.createElement('article');
    newProductItem.classList.add('product-item');
    
    const productTitle = document.createElement('h3');
    const productLink = document.createElement('a');
    productLink.href = 'product-detail.html';
    productLink.textContent = productName;
    productTitle.appendChild(productLink);
    
    const productDesc = document.createElement('p');
    productDesc.textContent = `Description: ${productDescription}`;
    
    const productPriceTag = document.createElement('p');
    productPriceTag.textContent = `Price: $${productPrice}`;
    
    // Create an image element if a file was uploaded
    if (productImage) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const productImg = document.createElement('img');
            productImg.src = e.target.result;
            productImg.alt = productName;
            productImg.classList.add('product-image'); // Add a class for styling
            newProductItem.insertBefore(productImg, productTitle);
        };
        reader.readAsDataURL(productImage);
    }
    
    // Create edit and delete buttons
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-product');
    editButton.addEventListener('click', () => editProduct(newProductItem));
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-product');
    deleteButton.addEventListener('click', () => deleteProduct(newProductItem));
    
    // Append the new elements to the new product item
    newProductItem.appendChild(productTitle);
    newProductItem.appendChild(productDesc);
    newProductItem.appendChild(productPriceTag);
    newProductItem.appendChild(editButton);
    newProductItem.appendChild(deleteButton);
    
    // Append the new product item to the product list
    document.getElementById('productList').appendChild(newProductItem);
    
    // Clear the form
    document.getElementById('productForm').reset();
});

function editProduct(productItem) {
    const productName = prompt('Enter new product name:', productItem.querySelector('h3 a').textContent);
    const productDescription = prompt('Enter new product description:', productItem.querySelector('p:nth-of-type(1)').textContent.replace('Description: ', ''));
    const productPrice = prompt('Enter new product price:', productItem.querySelector('p:nth-of-type(2)').textContent.replace('Price: $', ''));
    
    if (productName && productDescription && productPrice) {
        productItem.querySelector('h3 a').textContent = productName;
        productItem.querySelector('p:nth-of-type(1)').textContent = `Description: ${productDescription}`;
        productItem.querySelector('p:nth-of-type(2)').textContent = `Price: $${productPrice}`;
    }
}

function deleteProduct(productItem) {
    productItem.remove();
}
