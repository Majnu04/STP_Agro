# Cart Functionality Test Guide

## How to Test Cart:

### Step 1: Add Items to Cart
1. Scroll down to the products section
2. Find any product (make sure it shows "In Stock")
3. Click the shopping cart icon (🛒) at the bottom right of the product card
4. You should see a green toast notification saying "Added to cart!"
5. The cart count in the navbar (top right) should increase

### Step 2: Open Cart
1. Click the cart icon in the navbar (top right, next to profile)
2. The cart modal should slide in from the right
3. You should see your added products listed

### Step 3: Manage Cart Items
- **Increase quantity**: Click the + button
- **Decrease quantity**: Click the - button  
- **Remove item**: Click the trash icon
- **Close cart**: Click the X button at top right

## What Cart Shows:
- List of all added products
- Quantity controls for each item
- Price per item
- Subtotal
- Shipping cost (₹50 if order < ₹1000, FREE if > ₹1000)
- Total amount
- "Proceed to Checkout" button

## If Cart Appears Empty:
This is NORMAL if you haven't added any products yet!

**Solution**: Add products first by clicking the cart icon on product cards.

## Cart Features:
✅ Add multiple products
✅ Adjust quantities
✅ Remove items
✅ Free shipping on orders over ₹1000
✅ Real-time total calculation
✅ Persistent cart count in navbar

## Common Mistakes:
❌ **Clicking cart icon before adding products** - Cart will be empty
❌ **Clicking on "Out of Stock" products** - These cannot be added
✅ **Must click the cart icon ON the product card first**
✅ **Then click the cart icon in navbar to view cart**

## Testing Checklist:
- [ ] Products display correctly
- [ ] Cart icon on product card is clickable
- [ ] Toast notification appears after adding
- [ ] Cart count increases in navbar
- [ ] Cart modal opens when clicking navbar cart icon
- [ ] Products appear in cart modal
- [ ] Quantity can be adjusted
- [ ] Items can be removed
- [ ] Total calculates correctly
- [ ] Free shipping activates at ₹1000

---

If all these work, **your cart is functioning perfectly!** 🎉

The cart is working in the **frontend only** (localStorage).
To integrate with the backend API, you would need to:
1. Start the backend server: `cd server && node server.js`
2. Connect frontend API calls to backend endpoints
3. Implement authentication token handling
