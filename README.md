Amazon

//======Project setup======\\
1) clone
2) npm install
3) npm start
4) install in browser react redux extention

//========Captcha========\\
5) 5.1 Captcha site-key for connecting frontend and backend
       REACT_APP_SITE_KEY=6LdnJnYiAAAAAHtXqZf7ZQOkceIB72wuWgPei7yR
   5.2 Captcha secret-key for connecting backend and google profile
       RECAPTCHA_KEY=6LdnJnYiAAAAABZS3vOtysSp-_j0uKmnNo6nFe1O
   5.3 Recaptcha verify api link
   RECAPTCHA_SITE_VERIFY=https://www.google.com/recaptcha/api/siteverify

//=========Login========\\
6) for admin login go to "/login-admin" page
   for user login  go to "/login" page


Description

All users
+ loading spinner.
+ Should see a list of all products (cards view).
+ See product details by clicking on product.
+ Can Search products.
+ Add products to cart.
+ Remove products from cart.

Guests  
+ Can filter the list by product categories.
+ Can add the product to the cart.(localStorage).
+ Can remove the product from the cart.
+ Can save the product from the cart into the “Save for later” list.
+ Once clicked on “Proceed to checkout” should be redirected to the login/register page.
+ Note: Once registered data from localStorage should be stored in DB.
+ must see all products comments.

Registration
+ First Name
+ Last Name
+ Email
+ Password
+ Re-enter password
+ Confirm email
+ Captcha v3

Logged In User
+ Form validations.
+ Should be able to see all orders.
+ Change password.
+ Page “Your Addresses” (user can have multiple addresses).
+ Set address as default.
+ Buy products.
+ show Added on cart products, available addresses.
+ Ability set default one from available addresses before buying products.
+ Show ordered list.
+ Adding and reducing product count form cart-products and ready-to-buy pages.
+ Automatically send emails to users about added products in past 24 hours
+ Product comment crud, like, unlike.
+ Product like, unlike.

My Store
+ Product CRUD.
+ Name.
+ Description.
+ Brand.
+ Price.
+ In stock.
+ Choose colors.
+ Choose sizes.
+ Choose Category.
+ Images.
+ Delete product image
+ Publish/UnPublish Product (not available in products for guests if unpublished).
+ Ability to see how many times users bought each product.
+ Ability to choose products subcategories while creating a product.
- Ability to see total earnings for each product.
- Ability to choose a main image.

Admin
+ Form validations.
+ Categories CRUD.
+ Subcategories CRUD.
+ Sizes CRUD.
+ Users crud.
+ Products crud.
+ Must see all orders.
+ Have a seed to import default categories with their subcategories, users, categories and sizes.
+ Category CRUD (categories can have subcategories).
